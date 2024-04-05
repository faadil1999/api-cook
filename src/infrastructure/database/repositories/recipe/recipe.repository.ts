import { RecipeCreateRaw, RecipeNotFoundError, RecipeRaw, IRecipeRepository } from '../../../../contexts/recipe'
import { Recipe, RecipeUpdate } from '../../../../contexts/recipe/domains/types'
import { RelationalDatabase } from '../../database'
import { toRecipeRaw } from './recipe.mapper'
import { Prisma } from '@prisma/client'

export class RecipeRepository implements IRecipeRepository {
  constructor(private readonly database: RelationalDatabase) {}

  async addRecipe(recipe: RecipeCreateRaw): Promise<RecipeRaw> {
    const newRecipe = await this.database.client.recipe.create({
      data: recipe,
      include: {
        chef: true // Return all fields
      }
    })
    return toRecipeRaw(newRecipe)
  }

  async getAllRecipes(): Promise<RecipeRaw[]> {
    const recipes = await this.database.client.recipe.findMany({
      include: {
        chef: true // Return all fields
      }
    })
    return recipes.map(toRecipeRaw)
  }

  async getRecipe(id: string): Promise<Recipe | null> {
    const recipe = await this.database.client.recipe.findUnique({ where: { id }, include: { chef: true } })
    return recipe ? toRecipeRaw(recipe) : null
  }

  async getRecipeByName(name: string): Promise<RecipeRaw[]> {
    const recipes = await this.database.client.recipe.findMany({ where: { name: name }, include: { chef: true } })
    return recipes.map(toRecipeRaw)
  }

  async deleteRecipe(id: string): Promise<void> {
    try {
      await this.database.client.recipe.delete({ where: { id } })
    } catch (error) {
      // 2 façon de traiter le sujet, soit on envoie une erreur si le livre n'existe pas, sinon on ne fait rien.
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2025') {
      //     throw new RecipeNotFoundError(id)
      //   }
      // } else {
      //   throw error
      // }
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2025') {
        throw error
      }
    }
  }

  async updateRecipe(recipe: RecipeUpdate): Promise<Recipe> {
    const recipeUpdated = await this.database.client.recipe.update({
      where: { id: recipe.id },
      data: recipe,
      include: { chef: true }
    })
    return toRecipeRaw(recipeUpdated)
  }
}
