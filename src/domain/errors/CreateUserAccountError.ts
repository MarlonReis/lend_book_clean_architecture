export class CreateUserAccountError extends Error {
    constructor (error: Error) {
        super(error.message)
        this.stack = error.stack
        this.name = 'CreateUserAccountError'
    }
}
