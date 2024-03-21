import { BookNotFoundError, Book } from '../../domains'
import { IBookRepository } from '../../infrastructure'

export class GetBookUseCase {
  constructor(private bookRepository: IBookRepository) { }

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.getBook(id)
    if (!book) {
      throw new BookNotFoundError(id)
    } else {
      return book
    }
  }
}
