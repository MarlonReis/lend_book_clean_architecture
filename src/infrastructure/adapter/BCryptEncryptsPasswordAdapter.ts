import bcrypt from 'bcrypt'
import { EncryptsPassword } from '../../data/protocol/EncryptsPassword'
import { InvalidPasswordError } from '../../domain/errors'
import { Password } from '../../domain/object-value'
import { Either, failure } from '../../shared/Either'

export class BCryptEncryptsPasswordAdapter implements EncryptsPassword {
    encrypt = async (password: Password): Promise<Either<InvalidPasswordError, Password>> => {
        try {
            const passwordEncrypted = await bcrypt.hash(password.value, 12)
            return Password.create(passwordEncrypted)
        } catch (err) {
            return failure(new InvalidPasswordError(password.value))
        }
    }
}
