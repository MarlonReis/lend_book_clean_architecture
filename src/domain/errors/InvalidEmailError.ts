export class InvalidEmailError extends Error {
    constructor (email: string) {
        super(`attribute 'email' equals the ${email} is invalid!`)
        this.name = 'InvalidEmailError'
    }
}
