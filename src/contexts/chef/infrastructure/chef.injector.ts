import { Router } from 'express'
import { ChefRepository, RelationalDatabase } from '../../../infrastructure/database'
import { AddChefUseCase, GetChefsUseCase } from '../use-cases'
import { chefRoutes } from './chef.routes'
import { ChefController } from './controller'
import { GetChefUseCase } from '../use-cases/get-chef'
import { DeleteChefUseCase } from '../use-cases/delete-chef'
import { UpdateChefUseCase } from '../use-cases/update-chef/update-chef.use-case'

export type ChefExternalDependencies = {
  database: RelationalDatabase
}

export const chefInjector = (externalDependencies: ChefExternalDependencies): Router => {
  const chefRepository = new ChefRepository(externalDependencies.database)

  const getChefsUseCase = new GetChefsUseCase(chefRepository)
  const addChefUseCase = new AddChefUseCase(chefRepository)
  const getChefUseCase = new GetChefUseCase(chefRepository)
  const deleteChefUseCase = new DeleteChefUseCase(chefRepository)
  const updateChefUseCase = new UpdateChefUseCase(chefRepository)

  const chefController = new ChefController(
    getChefsUseCase, 
    addChefUseCase,
    getChefUseCase,
    deleteChefUseCase,
    updateChefUseCase
    )

  return chefRoutes(chefController)
}
