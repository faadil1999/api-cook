import { Chef } from '../../domains/types'
import { IChefRepository } from '../../infrastructure'

export class GetChefUseCase {
  constructor(private chefRepository: IChefRepository) {console.log("constructor use case")}

  async execute(id: string): Promise<Chef> {
    console.log(id);
    const chef = await this.chefRepository.getChef(id)
    if(!chef) {
      throw new Error
    } else {
      return chef;
    }
  }
}
