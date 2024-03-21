import { Router } from 'express'
import { RecipeRepository, RelationalDatabase } from '../../../infrastructure/database'
import { AddRecipeUseCase, DeleteRecipeUseCase, GetRecipeUseCase, GetRecipesUseCase, UpdateRecipeUseCase } from '../use-cases'
import { recipeRoutes } from './recipe.routes'
import { RecipeController } from './controller'

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

  const recipeController = new RecipeController(
    getRecipesUseCase,
    addRecipeUseCase,
    getRecipeUseCase,
    deleteRecipeUseCase,
    updateRecipeUseCase
  )

  return recipeRoutes(recipeController)
}
