import { Password } from '../../domain/object-value'

export interface EncryptsPassword {
    encrypt: (password: Password) => Password
}
