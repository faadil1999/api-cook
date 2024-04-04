import { Chef, ChefUpdate } from '../../domains'
import { IChefRepository } from '../../infrastructure'

export class UpdateChefUseCase {
  constructor(private chefRepository: IChefRepository) {}

  async execute(id: string, chef: Omit<ChefUpdate, 'id'>): Promise<Chef> {
    return this.chefRepository.updateChef({ ...chef, id })
  }
}
