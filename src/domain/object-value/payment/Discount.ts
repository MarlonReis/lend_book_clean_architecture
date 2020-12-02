import { Either, failure, success } from '../../../shared/Either'
import { InvalidDiscountParametersError } from '../../errors'

export class Discount {
    public readonly accountId: string
    public readonly conciliationId: string
    public readonly partnerId: string
    public readonly payableId: string

    private constructor (accountId: string, conciliationId: string,
        partnerId: string, payableId: string) {
        this.accountId = accountId
        this.conciliationId = conciliationId
        this.partnerId = partnerId
        this.payableId = payableId
        Object.freeze(this)
    }

    static create (data: any): Either<InvalidDiscountParametersError, Discount> {
        if (!data.accountId || !(/[0-9]+/.test(data.accountId))) {
            return failure(new InvalidDiscountParametersError('accountId', data.accountId))
        }

        if (!data.conciliationId || !(/.{2,}/.test(data.conciliationId))) {
            return failure(new InvalidDiscountParametersError('conciliationId', data.conciliationId))
        }

        if (!data.partnerId || !(/[0-9a-fA-F-]+[0-9a-fA-F]/.test(data.partnerId))) {
            return failure(new InvalidDiscountParametersError('partnerId', data.partnerId))
        }

        if (!data.payableId || !(/[0-9a-fA-F-]+[0-9a-fA-F]/.test(data.payableId))) {
            return failure(new InvalidDiscountParametersError('payableId', data.payableId))
        }

        return success(new Discount(data.accountId, data.conciliationId,
            data.partnerId, data.payableId))
    }
}
