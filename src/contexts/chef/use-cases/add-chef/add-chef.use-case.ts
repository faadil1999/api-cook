import { Chef, ChefCreate } from '../../domains/types'
import { IChefRepository } from '../../infrastructure'

export class AddChefUseCase {
  constructor(private chefRepository: IChefRepository) {}

  async execute(chef: ChefCreate): Promise<Chef> {
    return this.chefRepository.addChef(chef)
  }
}
