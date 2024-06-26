import { Router } from 'express'
import { RecipeRepository } from '../../../infrastructure/database'
import { AddRecipeUseCase, DeleteRecipeUseCase, GetRecipeUseCase, GetRecipesUseCase, UpdateRecipeUseCase } from '../use-cases'
import { recipeRoutes } from './recipe.routes'
import { RecipeController } from './controller'
import { GetRecipeByNameUseCase } from '../use-cases/get-by-name-recipe/get-recipe-by-name.use-case'
import { PaginateRecipesUseCase } from '../use-cases/paginate-recipes/paginate-recipe.use-case'
import { RelationalDatabase } from '../../../infrastructure/database/database'

export type RecipeExternalDependencies = {
  database: RelationalDatabase
}

export const recipeInjector = (externalDependencies: RecipeExternalDependencies): Router => {
  const recipeRepository = new RecipeRepository(externalDependencies.database)

  const getRecipesUseCase = new GetRecipesUseCase(recipeRepository)
  const addRecipeUseCase = new AddRecipeUseCase(recipeRepository)
  const getRecipeUseCase = new GetRecipeUseCase(recipeRepository)
  const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository)
  const updateRecipeUseCase = new UpdateRecipeUseCase(recipeRepository)
  const getRecipeByName = new GetRecipeByNameUseCase(recipeRepository);
  const paginateRecipe = new PaginateRecipesUseCase(recipeRepository);

  
  const recipeController = new RecipeController(
    getRecipesUseCase,
    addRecipeUseCase,
    getRecipeUseCase,
    deleteRecipeUseCase,
    updateRecipeUseCase,
    getRecipeByName,
    paginateRecipe,
  )

  return recipeRoutes(recipeController)
}
