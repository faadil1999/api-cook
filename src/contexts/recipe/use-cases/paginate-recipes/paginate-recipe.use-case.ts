import { Recipe } from '../../domains/types';
import { IRecipeRepository } from '../../infrastructure'

export class PaginateRecipesUseCase {
  constructor(private recipeRepository: IRecipeRepository) { }

  async execute(pageNumber: number): Promise<Recipe[]> {
    return await this.recipeRepository.paginateRecipes(pageNumber);
  }
}
