import { RecipeNotFoundError, Recipe } from '../../domains'
import { IRecipeRepository } from '../../infrastructure'

export class GetRecipeByNameUseCase {
  constructor(private recipeRepository: IRecipeRepository) { }

  async execute(name: string): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.getRecipeByName(name)
    if (!recipes) {
      throw new RecipeNotFoundError(name)
    } else {
      return recipes
    }
  }
}