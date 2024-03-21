import { Chef } from './../../recipe/domains/types/book';
import { Chef, ChefCreate } from '../domains/types'

export type chefRaw = Chef
export type ChefCreateRaw = ChefCreate

export interface IChefRepository {
  getAllChefs(): Promise<ChefRaw[]>
  addChef(Chef: ChefCreateRaw): Promise<ChefRaw>
}
