import { type Prisma } from '@prisma/client'

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

// export type RecipeCreate = Omit<Recipe, 'id'>
export type RecipeCreate = Prisma.RecipeCreateInput

export type RecipeUpdate = Omit<Recipe, 'chef'>
