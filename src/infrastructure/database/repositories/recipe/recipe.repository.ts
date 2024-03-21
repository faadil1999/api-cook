import { BookCreateRaw, BookNotFoundError, BookRaw, IBookRepository } from '../../../../contexts/book'
import { Book, BookUpdate } from '../../../../contexts/book/domains/types'
import { RelationalDatabase } from '../../database'
import { toBookRaw } from './recipe.mapper'
import { Prisma } from '@prisma/client'

export class BookRepository implements IBookRepository {
  constructor(private readonly database: RelationalDatabase) { }

  async addBook(book: BookCreateRaw): Promise<BookRaw> {
    const newBook = await this.database.client.book.create({
      data: book,
      include: {
        author: true // Return all fields
      }
    })
    return toBookRaw(newBook)
  }

  async getAllBooks(): Promise<BookRaw[]> {
    const books = await this.database.client.book.findMany({
      include: {
        author: true // Return all fields
      }
    })
    return books.map(toBookRaw)
  }

  async getBook(id: string): Promise<Book | null> {
    const book = await this.database.client.book.findUnique({ where: { id }, include: { author: true } })
    return book ? toBookRaw(book) : null
  }

  async deleteBook(id: string): Promise<void> {
    try {
      await this.database.client.book.delete({ where: { id } })
    } catch (error) {
      // 2 façon de traiter le sujet, soit on envoie une erreur si le livre n'existe pas, sinon on ne fait rien.
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2025') {
      //     throw new BookNotFoundError(id)
      //   }
      // } else {
      //   throw error
      // }
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2025') {
        throw error
      }
    }
  }

  async updateBook(book: BookUpdate): Promise<Book> {
    const bookUpdated = await this.database.client.book.update({
      where: { id: book.id },
      data: book,
      include: { author: true }
    })
    return toBookRaw(bookUpdated)
  }
}
