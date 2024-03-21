export type Chef = {
  id: string
  name: string
}

export type Recipe = {
  id: string
  name: string
  description: string
  chef: Chef
}

export type RecipeCreate = Omit<Recipe, 'id' | 'chef'> & { recipeId: string }

export type RecipeUpdate = Omit<Recipe, 'recipe'>
