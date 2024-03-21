import { Router } from 'express'
import { BookController } from './controller'

export function bookRoutes(controller: BookController): Router {
  const router = Router()
  
  router.get('/', controller.getBooks.bind(controller))
  
  router.post('/', controller.addBook.bind(controller))
  
  router.get('/:id', controller.getBook.bind(controller))
  
  router.delete('/:id', controller.deleteBook.bind(controller))
  
  router.put('/:id', controller.updateBook.bind(controller))
  return router
}
