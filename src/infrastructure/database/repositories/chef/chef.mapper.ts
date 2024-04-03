import { Chef, Recipe } from '@prisma/client'
import { ChefRaw } from '../../../../contexts/chef'

export function toChefRaw(chef: Chef & { recipes: Recipe[] }): ChefRaw {
  return {
    id: chef.id,
    first_name: chef.first_name,
    last_name: chef.last_name,
    phone: chef.phone,
    country: chef.country,
    recipes: chef.recipes.map((recipe: Recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description
    }))
  }
}
