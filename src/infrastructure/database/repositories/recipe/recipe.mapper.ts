import { Author, Book } from '@prisma/client'
import { BookRaw } from '../../../../contexts/book'

export function toBookRaw(book: Book & { author: Author }): BookRaw {
  return {
    id: book.id,
    title: book.title,
    description: book.description,
    author: {
      id: book.author.id,
      name: book.author.name
    }
  }
}
