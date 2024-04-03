// import { Chef } from './../../recipe/domains/types/recipe';
import { Chef, ChefCreate, ChefUpdate } from '../domains/types'

export type chefRaw = Chef
export type ChefCreateRaw = ChefCreate

export interface IChefRepository {
  getAllChefs(): Promise<ChefRaw[]>
  addChef(chef: ChefCreateRaw): Promise<ChefRaw>
  getChef(id: string): Promise<ChefRaw>
  deleteChef(id: string): Promise<void>
  updateChef(chef: ChefUpdate): Promise<ChefRaw>

}
