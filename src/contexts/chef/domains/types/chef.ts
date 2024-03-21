import { Recipe } from './recipe'

export type Chef = {
  id: string
  first_name: string
  last_name: string
  recipes: Recipe[]
}

export type ChefCreate = Omit<Chef, 'id' | 'recipes'>
