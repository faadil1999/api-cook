import { Router } from 'express'
import { Config } from '../config'
import { RecipeExternalDependencies, recipeInjector } from '../contexts/recipe/infrastructure/recipe.injector'
import { chefInjector } from '../contexts/chef'

export type ExternalDependencies = RecipeExternalDependencies

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getRoutes: GetRoutes = (externalDependencies: ExternalDependencies): Router[] => {
  // Main routes
  return [
    Router().use('/recipe', recipeInjector(externalDependencies)),
    Router().use('/chef', chefInjector(externalDependencies))
  ]
}

export type GetRoutes = (externalDependencies: ExternalDependencies) => Router[]
