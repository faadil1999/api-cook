import { Router } from 'express'
import { RecipeController } from './controller'

export function recipeRoutes(controller: RecipeController): Router {
  const router = Router()
  
  router.get('/', controller.getRecipes.bind(controller))
  
  router.post('/', controller.addRecipe.bind(controller))
  
  router.get('/:id', controller.getRecipe.bind(controller))
  
  router.delete('/:id', controller.deleteRecipe.bind(controller))
  
  router.put('/:id', controller.updateRecipe.bind(controller))

  router.get('/by-name/:name')
  return router
}
