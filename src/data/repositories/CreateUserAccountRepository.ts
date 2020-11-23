import { CreateUserAccountError } from '../../domain/errors'
import { User } from '../../domain/model/user/User'
import { Either } from '../../shared/Either'

export interface CreateUserAccountRepository {
    create: (user: User) => Promise<Either<CreateUserAccountError, User>>
}
