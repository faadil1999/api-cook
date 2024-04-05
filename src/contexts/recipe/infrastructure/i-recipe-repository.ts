import { Recipe, RecipeCreate, RecipeUpdate } from '../domains/types'
export * from '../domains/errors';

export type RecipeRaw = Recipe
export type RecipeCreateRaw = RecipeCreate
export type RecipeUpdateRaw = RecipeUpdate

export interface IRecipeRepository {
  getAllRecipes(): Promise<RecipeRaw[]>
  addRecipe(recipe: RecipeCreate): Promise<RecipeRaw>
  getRecipe(id: string): Promise<RecipeRaw | null>
  getByNameRecipe(name: string): Promise<RecipeRaw[]>
  deleteRecipe(id: string): Promise<void>
  updateRecipe(recipe: RecipeUpdate): Promise<RecipeRaw>
}