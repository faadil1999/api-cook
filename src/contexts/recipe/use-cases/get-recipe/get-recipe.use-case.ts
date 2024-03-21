import { RecipeNotFoundError, Recipe } from '../../domains'
import { IRecipeRepository } from '../../infrastructure'

export class GetRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) { }

  async execute(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.getRecipe(id)
    if (!recipe) {
      throw new RecipeNotFoundError(id)
    } else {
      return recipe
    }
  }
}
