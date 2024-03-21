import { DomainError } from './domain.error'

export class RecipeNotFoundError extends DomainError {
    constructor(public id: string) {
        super(`Recipe ${id} not found`)
    }
}
