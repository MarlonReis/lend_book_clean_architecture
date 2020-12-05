import { Either } from '../../shared/Either'
import { CreateUserAccountError } from '../errors'
import { User } from '../model/User'

export interface CreateAccount {
    name: string
    email: string
    password: string
}
export interface CreateUserAccount {
    create: (account: CreateAccount) => Promise<Either<CreateUserAccountError, User>>
}
