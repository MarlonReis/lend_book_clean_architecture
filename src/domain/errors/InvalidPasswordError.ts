export class InvalidPasswordError extends Error {
    constructor (password: string) {
        super(`Attribute 'password' equals ${password} is invalid!`)
        this.name = 'InvalidPasswordError'
    }
}
