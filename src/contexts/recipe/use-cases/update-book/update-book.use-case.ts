import { Book, BookUpdate } from '../../domains/types'
import { IBookRepository } from '../../infrastructure'

export class UpdateBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string, book: Omit<BookUpdate, 'id'>): Promise<Book> {
    return this.bookRepository.updateBook({ ...book, id })
  }
}
