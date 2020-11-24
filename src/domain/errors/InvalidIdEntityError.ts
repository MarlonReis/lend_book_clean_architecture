export class InvalidIdEntityError extends Error {
    constructor (id: string) {
        super(`Attribute 'id' equals ${id} is invalid!`)
    }
}
