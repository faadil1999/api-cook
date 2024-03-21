import { Chef } from '../../domains/types'
import { IChefRepository } from '../../infrastructure'

export class GetChefsUseCase {
  constructor(private ChefRepository: IChefRepository) {}

  async execute(): Promise<Chef[]> {
    return this.ChefRepository.getAllChefs()
  }
}
