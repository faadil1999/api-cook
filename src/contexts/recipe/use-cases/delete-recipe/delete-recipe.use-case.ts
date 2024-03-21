import { Recipe } from '../../domains/types'
import { IRecipeRepository } from '../../infrastructure'

export class DeleteRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(id: string): Promise<void> {
    return this.recipeRepository.deleteRecipe(id)
  }
}
