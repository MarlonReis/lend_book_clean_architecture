import { InvalidPasswordError } from '../../domain/errors'
import { Either } from '../../shared/Either'

export interface EncryptsPassword {
    encrypt: (password: string) => Promise<Either<InvalidPasswordError, string>>
}
