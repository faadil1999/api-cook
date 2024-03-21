import { Recipe } from '../../domains/types'
import { IRecipeRepository } from '../../infrastructure'

export class GetRecipesUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(): Promise<Recipe[]> {
    return this.recipeRepository.getAllRecipes()
  }
}
