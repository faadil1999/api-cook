import { Chef } from '../../domains'
import { IChefRepository } from '../../infrastructure'

export class DeleteChefUseCase {
  constructor(private chefRepository: IChefRepository) {}

  async execute(id: string): Promise<void> {
    return this.chefRepository.deleteChef(id)
  }
}
