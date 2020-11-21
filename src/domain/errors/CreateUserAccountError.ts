export class CreateUserAccountError extends Error {
    readonly cause: Error
    constructor (error: Error) {
        super(error.message)
        this.cause = error
        this.name = 'CreateUserAccountError'
        Object.freeze(this)
    }
}
