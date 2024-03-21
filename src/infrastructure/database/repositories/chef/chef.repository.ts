import { ChefCreateRaw, ChefRaw, IChefRepository } from '../../../../contexts/chef'
import { RelationalDatabase } from '../../database'
import { toChefRaw } from './chef.mapper'

export class ChefRepository implements IChefRepository {
  constructor(private readonly database: RelationalDatabase) {}

  async addChef(chef: ChefCreateRaw): Promise<ChefRaw> {
    const newChef = await this.database.client.chef.create({ data: chef, include: { recipe: true } })
    return toChefRaw(newChef)
  }

  async getAllChefs(): Promise<ChefRaw[]> {
    const Chefs = await this.database.client.chef.findMany({ include: { recipe: true } })
    return Chefs.map(toChefRaw)
  }
}
