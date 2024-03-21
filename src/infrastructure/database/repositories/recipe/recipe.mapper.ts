import { Chef, Recipe } from '@prisma/client'
import { RecipeRaw } from '../../../../contexts/recipe'

export function toRecipeRaw(recipe: Recipe & { chef: Chef }): RecipeRaw {
  return {
    id: recipe.id,
    title: recipe.name,
    description: recipe.description,
    chef: {
      id: recipe.chef.id,
      first_name: recipe.chef.first_name
    }
  }
}
