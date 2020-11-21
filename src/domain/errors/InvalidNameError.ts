export class InvalidNameError extends Error {
    constructor (name: string) {
        super(`Attribute 'name' equals ${name} is invalid!`)
        this.name = 'InvalidNameError'
    }
}
