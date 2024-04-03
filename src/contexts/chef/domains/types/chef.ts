import { Recipe } from './recipe'

export type Chef = {
  id: string
  first_name: string
  last_name: string
  phone: string
  country: string
  recipes: Recipe[]
}

export type ChefCreate = Omit<Chef, 'id' | 'recipes'>
