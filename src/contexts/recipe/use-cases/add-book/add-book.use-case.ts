import { Book, BookCreate } from '../../domains/types'
import { IBookRepository } from '../../infrastructure'

export class AddBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(book: BookCreate): Promise<Book> {
    return this.bookRepository.addBook(book)
  }
}
