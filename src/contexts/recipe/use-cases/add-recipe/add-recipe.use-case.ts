import { Recipe, RecipeCreate } from '../../domains/types'
import { IRecipeRepository } from '../../infrastructure'

export class AddRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(recipe: RecipeCreate): Promise<Recipe> {
    return this.recipeRepository.addRecipe(recipe)
  }
}
