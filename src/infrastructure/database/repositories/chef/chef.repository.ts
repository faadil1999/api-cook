import { ChefCreateRaw, ChefRaw, ChefUpdateRaw, IChefRepository } from '../../../../contexts/chef'
import { Chef, ChefUpdate } from '../../../../contexts/chef/domains/types'
import { RelationalDatabase } from '../../database'
import { toChefRaw } from './chef.mapper'
import { Prisma } from '@prisma/client'


export class ChefRepository implements IChefRepository {
  constructor(private readonly database: RelationalDatabase) {}

  async addChef(chef: ChefCreateRaw): Promise<ChefRaw> {
    const newChef = await this.database.client.chef.create({ 
      data: chef, 
      include: { 
        recipes: true 
      } 
    })
    return toChefRaw(newChef)
  }

  async getAllChefs(): Promise<ChefRaw[]> {
    const Chefs = await this.database.client.chef.findMany({ include: { recipes: true } })
    return Chefs.map(toChefRaw)
  }

  async getChef(id: string): Promise<Chef | null> {
    const chef = await this.database.client.chef.findUnique({ where: { id }, include: { recipes: true } })
    return chef ? toChefRaw(chef) : null
  }

  async deleteChef(id: string): Promise<void> {
    try {
      await this.database.client.chef.delete({ where: { id } })
    } catch (error) {
      // 2 façon de traiter le sujet, soit on envoie une erreur si le livre n'existe pas, sinon on ne fait rien.
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2025') {
      //     throw new ChefNotFoundError(id)
      //   }
      // } else {
      //   throw error
      // }
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2025') {
        throw error
      }
    }
  }

  async updateChef(chef: ChefUpdateRaw): Promise<Chef> {
    const chefUpdated = await this.database.client.chef.update({
      where: { id: chef.id as string },
      data: chef,
      include: { recipes: true }
    })
    return toChefRaw(chefUpdated)
  }
}
