export class InvalidBoletoParametersError extends Error {
    constructor (param: string, value: string) {
        super(`'${param}' equals '${value}' is invalid!`)
        this.name = 'InvalidBoletoParametersError'
    }
}
