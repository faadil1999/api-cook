import { Recipe, RecipeUpdate } from '../../domains/types'
import { IRecipeRepository } from '../../infrastructure'

export class UpdateRecipeUseCase {
  constructor(private recipeRepository: IRecipeRepository) {}

  async execute(id: string, recipe: Omit<RecipeUpdate, 'id'>): Promise<Recipe> {
    return this.recipeRepository.updateRecipe({ ...recipe, id })
  }
}
