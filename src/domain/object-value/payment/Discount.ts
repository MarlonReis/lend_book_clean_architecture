import { Either, failure, success } from '../../../shared/Either'
import { InvalidDiscountParametersError } from '../../errors'

const isInvalid = {
    accountId: (value: string): boolean => (!value || !(/[0-9]+/.test(value))),
    conciliationId: (value: string): boolean => (!value || !(/.{2,}/.test(value))),
    partnerId: (value: string): boolean => (!value || !(/[0-9a-fA-F-]+[0-9a-fA-F]/.test(value))),
    payableId: (value: string): boolean => (!value || !(/[0-9a-fA-F-]+[0-9a-fA-F]/.test(value)))
}
const fields = ['accountId', 'conciliationId', 'partnerId', 'payableId']

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
        for (const fieldName of fields) {
            const value = data[fieldName]
            if (isInvalid[fieldName](value)) {
                return failure(new InvalidDiscountParametersError(fieldName, value))
            }
        }

        return success(new Discount(data.accountId, data.conciliationId,
            data.partnerId, data.payableId))
    }
}
