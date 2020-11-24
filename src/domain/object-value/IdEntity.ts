import { Either, failure, success } from '../../shared/Either'
import { InvalidIdEntityError } from '../errors'

export class IdEntity {
    private readonly value: string

    private constructor (id: string) {
        this.value = id
        Object.freeze(this)
    }

    static create = (id: string): Either<InvalidIdEntityError, IdEntity> => {
        if (id) {
            return success(new IdEntity(id))
        }
        return failure(new InvalidIdEntityError(id))
    }
}
