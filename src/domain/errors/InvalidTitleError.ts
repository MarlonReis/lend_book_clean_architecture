export class InvalidTitleError extends Error {
    constructor (title: string) {
        super(`Attribute 'title' equals ${title} is invalid!`)
        this.name = 'InvalidTitleError'
    }
}
