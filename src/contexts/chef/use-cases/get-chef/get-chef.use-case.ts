import { Chef } from '../../domains'
import { IChefRepository } from '../../infrastructure'

export class GetChefUseCase {
  constructor(private chefRepository: IChefRepository) {}

  async execute(id: string): Promise<Chef> {
    return this.chefRepository.getChef(id)
  }
}
