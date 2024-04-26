import { DomainError } from './domain.error'

export class TagNotFoundError extends DomainError {
    constructor(public id: string) {
        super(`Tag ${id} not found`)
    }
}
