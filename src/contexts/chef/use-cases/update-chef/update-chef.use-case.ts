//import { Chef, ChefUpdate } from '../../domains'
import { Chef, ChefUpdate } from '../../domains/types'
import { IChefRepository } from '../../infrastructure'

export class UpdateChefUseCase {
  constructor(private chefRepository: IChefRepository) {}
  async execute(id: string, chef: Omit<ChefUpdate, 'id'>): Promise<Chef> {
    console.log("cheffff");
    return this.chefRepository.updateChef({ ...chef, id })
  }
}
