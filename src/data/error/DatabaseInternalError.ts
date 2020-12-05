export class DatabaseInternalError extends Error {
    public readonly cause: Error

    constructor (error: Error) {
        super(error.message)
        this.cause = error
        this.name = 'DatabaseInternalError'
        Object.freeze(this)
    }
}
