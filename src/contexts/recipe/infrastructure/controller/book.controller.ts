import { Request, Response } from 'express'
import { AddBookUseCase, DeleteBookUseCase, GetBookUseCase, GetBooksUseCase, UpdateBookUseCase } from '../../use-cases'
import { BookNotFoundError } from '../../domains'
import { internal, notFound } from '../../../../infrastructure'
import { ValidationError, validate } from 'jsonschema'
import { ValidatorResult } from 'jsonschema'

const bookCreateSchema = {
  id: "/Book",
  type: "object",
  properties: {
    title: {
      type: "string"
    },
    authorId: {
      type: "string"
    },
    description: {
      type: "string"
    },
  },
  required: ["title", "authorId", "description"]
}

export class BookController {
  constructor(
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly addBookUseCase: AddBookUseCase,
    private readonly getBookUseCase: GetBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase
  ) { }

  // Q2
  async getBooks(req: Request, res: Response) {
    const books = await this.getBooksUseCase.execute()
    res.status(200).json(books)
  }

  // Q1
  async addBook(req: Request, res: Response) {
    // mettre une validation pour chaque endpoint, bien gérer l'objet d'erreur (ici fait un peu à la va vite)
    const result = validate(req.body, bookCreateSchema)
    if (!result.valid) {
      const errors = result.errors.map((error: ValidationError) => {
        return {
          message: error.message
        }
      })
      return res.status(400).json(errors)
    }

    const book = await this.addBookUseCase.execute(req.body)
    res.status(201).json(book)
  }

  // Q3
  async getBook(req: Request, res: Response) {
    try {
      const book = await this.getBookUseCase.execute(req.params.id)
      res.status(200).json(book)
    } catch (error) {
      // à faire idéalement dans chaque fonction (voir à faire une mise en commmun)
      const httpResponse = convertErrorsToHttpResponse(error)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }

  // Q4
  async deleteBook(req: Request, res: Response) {
    const book = await this.deleteBookUseCase.execute(req.params.id)
    res.status(200).json(book)
  }

  // Q5
  async updateBook(req: Request, res: Response) {
    const book = await this.updateBookUseCase.execute(req.params.id, req.body)
    res.status(200).json(book)
  }
}

function convertErrorsToHttpResponse(error: unknown) {
  // https://www.baeldung.com/rest-api-error-handling-best-practices
  if (error instanceof BookNotFoundError) {
    return notFound({ message: error.message, code: 'book-not-found', data: { id: error.id } })
  }
  return internal()
}
