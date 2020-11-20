export default class InvalidNameError extends Error {
    constructor (name: string) {
        super(`Attribute 'name' equal ${name} is invalid!`)
        this.name = 'InvalidNameError'
    }
}
