import { Name, Password } from '../../object-value'
import Email from '../../object-value/Email'
export class User {
    private readonly name: Name
    private readonly email: Email
    private readonly password: Password

    public constructor (name: Name, email: Email, password: Password) {
        this.name = name
        this.email = email
        this.password = password
    }

    readonly getName = (): Name => {
        return this.name
    }

    readonly getEmail = (): Email => {
        return this.email
    }

    readonly getPassword = (): Password => {
        return this.password
    }
}
