export class InternalServerError extends Error {
    public readonly cause: Error
    constructor (causeError: Error) {
        super('Internal server error')
        this.name = 'InternalServerError'
        this.cause = causeError
    }
}
