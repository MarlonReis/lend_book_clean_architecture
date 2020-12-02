import { Either, failure, success } from '../../../shared/Either'
import { InvalidBalanceParametersError } from '../../errors'

export class Balance {
    public readonly accountId: string
    public readonly transactionId: string

    private constructor (accountId: string, transactionId: string) {
        this.accountId = accountId
        this.transactionId = transactionId
    }

    static create (data: any): Either<InvalidBalanceParametersError, Balance> {
        if (!data.accountId || !(/[0-9]+/.test(data.accountId))) {
            return failure(new InvalidBalanceParametersError('accountId', data.accountId))
        }

        if (!data.transactionId || !(/[0-9]+/.test(data.transactionId))) {
            return failure(new InvalidBalanceParametersError('transactionId', data.transactionId))
        }

        return success(new Balance(data.accountId, data.transactionId))
    }
}
