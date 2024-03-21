export type Chef = {
  id: string
  first_name: string
  last_name: string
  phone: string
  country: string 
}

export type Recipe = {
  id: string
  name: string
  description: string
  chef: Chef
}

export type RecipeCreate = Omit<Recipe, 'id' | 'chef'> & { recipeId: string }

export type RecipeUpdate = Omit<Recipe, 'recipe'>
