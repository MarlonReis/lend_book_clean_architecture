export class InvalidParamError extends Error {
    constructor (field: string, value: string) {
        super(`Attribute '${field}' equals '${value}' is invalid!`)
        this.name = 'InvalidParamError'
    }
}
