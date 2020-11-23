import { InvalidPasswordError } from '../../domain/errors'
import { Password } from '../../domain/object-value'
import { Either } from '../../shared/Either'

export interface EncryptsPassword {
    encrypt: (password: Password) => Promise<Either<InvalidPasswordError, Password>>
}
