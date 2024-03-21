import { Router } from 'express'
import { ChefController } from './controller'

export function chefRoutes(controller: ChefController): Router {
  const router = Router()
  router.get('/', controller.getChefs.bind(controller))
  router.post('/', controller.addChef.bind(controller))
  return router
}
