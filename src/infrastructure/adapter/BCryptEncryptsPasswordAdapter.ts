import bcrypt from 'bcrypt'
import { EncryptsPassword } from '../../data/protocol/EncryptsPassword'
import { InvalidPasswordError } from '../../domain/errors'
import { Either, failure, success } from '../../shared/Either'

export class BCryptEncryptsPasswordAdapter implements EncryptsPassword {
    private readonly saltOrRounds: number

    constructor (saltOrRounds: number) {
        this.saltOrRounds = saltOrRounds
    }

    encrypt = async (password: string): Promise<Either<InvalidPasswordError, string>> => {
        try {
            const passwordEncrypted = await bcrypt.hash(password, this.saltOrRounds)
            return success(passwordEncrypted)
        } catch (err) {
            return failure(new InvalidPasswordError(password))
        }
    }
}
