import { Book } from '../../domains/types'
import { IBookRepository } from '../../infrastructure'

export class DeleteBookUseCase {
  constructor(private bookRepository: IBookRepository) {}

  async execute(id: string): Promise<void> {
    return this.bookRepository.deleteBook(id)
  }
}
