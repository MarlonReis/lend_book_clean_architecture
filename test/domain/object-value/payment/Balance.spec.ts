import { InvalidBalanceParametersError } from '../../../../src/domain/errors'
import { Balance } from '../../../../src/domain/object-value/payment/Balance'

describe('Balance', () => {
    test('should return failure when accountId is invalid', () => {
        const result = Balance.create({
            accountId: 'invalid',
            transactionId: '1592335222952238066'
        })

        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidBalanceParametersError)
        expect((result.value as InvalidBalanceParametersError).message)
            .toBe("'accountId' equals 'invalid' is invalid!")
    })

    test('should return failure when accountId is undefined', () => {
        const result = Balance.create({
            accountId: undefined,
            transactionId: '1592335222952238066'
        })

        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidBalanceParametersError)
        expect((result.value as InvalidBalanceParametersError).message)
            .toBe("'accountId' equals 'undefined' is invalid!")
    })

    test('should return failure when transactionId is invalid', () => {
        const result = Balance.create({
            accountId: '10756819792',
            transactionId: 'invalid'
        })

        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidBalanceParametersError)
        expect((result.value as InvalidBalanceParametersError).message)
            .toBe("'transactionId' equals 'invalid' is invalid!")
    })

    test('should return failure when transactionId is undefined', () => {
        const result = Balance.create({
            accountId: '10756819792',
            transactionId: undefined
        })

        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidBalanceParametersError)
        expect((result.value as InvalidBalanceParametersError).message)
            .toBe("'transactionId' equals 'undefined' is invalid!")
    })

    test('should return success when all properties is valid', () => {
        const result = Balance.create({
            accountId: '10756819792',
            transactionId: '1592335222952238066'
        })

        expect(result.isSuccess()).toBe(true)
        expect(result.value).toEqual({
            accountId: '10756819792',
            transactionId: '1592335222952238066'
        })
    })
})
