import { Book } from '../../domains/types'
import { IBookRepository } from '../../infrastructure'

export class GetBooksUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.getAllBooks()
  }
}
