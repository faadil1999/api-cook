import { Chef, Recipe } from '@prisma/client'
import { RecipeRaw } from '../../../../contexts/recipe/infrastructure'

export function toRecipeRaw(recipe: Recipe & { chef: Chef }): RecipeRaw {
  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    chef: {
      id: recipe.chef.id,
      first_name: recipe.chef.first_name,
      last_name: recipe.chef.last_name,
      phone: recipe.chef.phone,
      country: recipe.chef.country,
    }
  }
}
