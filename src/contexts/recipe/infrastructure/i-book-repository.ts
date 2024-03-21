import { Book, BookCreate, BookUpdate } from '../domains/types'
export * from '../domains/errors';

export type BookRaw = Book
export type BookCreateRaw = BookCreate
export type BookUpdateRaw = BookUpdate

export interface IBookRepository {
  getAllBooks(): Promise<BookRaw[]>
  addBook(book: BookCreate): Promise<BookRaw>
  getBook(id: string): Promise<BookRaw | null>
  deleteBook(id: string): Promise<void>
  updateBook(book: BookUpdate): Promise<BookRaw>
}