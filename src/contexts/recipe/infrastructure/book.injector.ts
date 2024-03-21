import { Router } from 'express'
import { BookRepository, RelationalDatabase } from '../../../infrastructure/database'
import { AddBookUseCase, DeleteBookUseCase, GetBookUseCase, GetBooksUseCase, UpdateBookUseCase } from '../use-cases'
import { bookRoutes } from './book.routes'
import { BookController } from './controller'

export type BookExternalDependencies = {
  database: RelationalDatabase
}

export const bookInjector = (externalDependencies: BookExternalDependencies): Router => {
  const bookRepository = new BookRepository(externalDependencies.database)

  const getBooksUseCase = new GetBooksUseCase(bookRepository)
  const addBookUseCase = new AddBookUseCase(bookRepository)
  const getBookUseCase = new GetBookUseCase(bookRepository)
  const deleteBookUseCase = new DeleteBookUseCase(bookRepository)
  const updateBookUseCase = new UpdateBookUseCase(bookRepository)

  const bookController = new BookController(
    getBooksUseCase,
    addBookUseCase,
    getBookUseCase,
    deleteBookUseCase,
    updateBookUseCase
  )

  return bookRoutes(bookController)
}
