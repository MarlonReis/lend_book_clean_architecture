export class InvalidDiscountParametersError extends Error {
    constructor (param: string, value: string) {
        super(`'${param}' equals '${value}' is invalid!`)
        this.name = 'InvalidDiscountParametersError'
    }
}
