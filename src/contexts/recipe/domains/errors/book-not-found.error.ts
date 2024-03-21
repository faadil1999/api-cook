import { DomainError } from './domain.error'

export class BookNotFoundError extends DomainError {
    constructor(public id: string) {
        super(`Book ${id} not found`)
    }
}
