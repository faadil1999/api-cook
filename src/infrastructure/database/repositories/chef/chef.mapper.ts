import { Chef, Recipe } from '@prisma/client'
import { ChefRaw } from '../../../../contexts/chef'

export function toChefRaw(chef: Chef & { recipes: Recipe[] }): ChefRaw {
  return {
    id: chef.id,
    first_name: chef.first_name,
    last_name: chef.last_name,
    recipes: chef.recipes.map((recipe: Recipe) => ({
      id: recipe.id,
      name: recipe.title,
      description: recipe.description
    }))
  }
}
