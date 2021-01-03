import { Either } from '@/shared/Either'
import { CreateUserAccountError } from '@/domain/errors'
import { User } from '@/domain/model/User'

export interface CreateAccount {
    name: string
    email: string
    password: string
}
export interface CreateUserAccount {
    create: (account: CreateAccount) => Promise<Either<CreateUserAccountError, User>>
}
