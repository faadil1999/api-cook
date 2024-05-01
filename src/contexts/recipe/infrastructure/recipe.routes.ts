import { Router } from 'express'
import { RecipeController } from './controller'

export function recipeRoutes(controller: RecipeController): Router {
  const router = Router()
  
  router.get('/', controller.getRecipes.bind(controller))
  
  router.post('/', controller.addRecipe.bind(controller))
  
  router.get('/recipe/:id', controller.getRecipe.bind(controller))
  
  router.delete('/recipe/:id', controller.deleteRecipe.bind(controller))
  
  router.put('/recipe/:id', controller.updateRecipe.bind(controller))

  router.get('/recipe/by-name/:name', controller.getByNameRecipe.bind(controller))

  router.get('/paginated/:pageNumber', controller.paginateRecipes.bind(controller));
  return router
}
