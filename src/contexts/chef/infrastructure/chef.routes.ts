import { Router } from 'express'
import { ChefController } from './controller'

export function chefRoutes(controller: ChefController): Router {
  const router = Router()
  router.get('/', controller.getChefs.bind(controller))

  router.post('/', controller.addChef.bind(controller))

  router.get('/:id', controller.getChef.bind(controller))
  
  router.delete('/:id', controller.deleteChef.bind(controller))
  
  router.put('/:id', controller.updateChef.bind(controller))
  return router
}
