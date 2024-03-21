import { Router } from 'express'
import { ChefRepository, RelationalDatabase } from '../../../infrastructure/database'
import { AddChefUseCase, GetChefsUseCase } from '../use-cases'
import { chefRoutes } from './chef.routes'
import { ChefController } from './controller'

export type ChefExternalDependencies = {
  database: RelationalDatabase
}

export const chefInjector = (externalDependencies: ChefExternalDependencies): Router => {
  const chefRepository = new ChefRepository(externalDependencies.database)

  const getChefsUseCase = new GetChefsUseCase(chefRepository)
  const addChefUseCase = new AddChefUseCase(chefRepository)

  const chefController = new ChefController(getChefsUseCase, addChefUseCase)

  return chefRoutes(ChefController)
}
