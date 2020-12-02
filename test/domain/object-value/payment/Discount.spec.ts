import { InvalidDiscountParametersError } from '../../../../src/domain/errors'
import { Discount } from '../../../../src/domain/object-value/payment/Discount'

describe('Discount', () => {
    test('should return failure when accountId is invalid', () => {
        const response = Discount.create({
            accountId: 'invalid',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR-35619777000113-20201020-5f8f24c8fa10db0007a4f428',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: '199'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'accountId' equals 'invalid' is invalid!")
    })

    test('should return failure when accountId is undefined', () => {
        const response = Discount.create({
            accountId: undefined,
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: '199'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'accountId' equals 'undefined' is invalid!")
    })

    test('should return failure when conciliationId is empty', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: '',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: '199'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'conciliationId' equals '' is invalid!")
    })

    test('should return failure when conciliationId is undefined', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: undefined,
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: '199'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'conciliationId' equals 'undefined' is invalid!")
    })

    test('should return failure when partnerId is invalid', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: 'invalid',
            payableId: '199'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'partnerId' equals 'invalid' is invalid!")
    })

    test('should return failure when partnerId is undefined', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: undefined,
            payableId: '199'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'partnerId' equals 'undefined' is invalid!")
    })

    test('should return failure when payableId is invalid', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: 'invalid'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'payableId' equals 'invalid' is invalid!")
    })

    test('should return failure when payableId is undefined', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: undefined
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
        expect((response.value as InvalidDiscountParametersError).message)
            .toBe("'payableId' equals 'undefined' is invalid!")
    })

    test('should return success', () => {
        const response = Discount.create({
            accountId: '35619777000113',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: '199'
        })

        expect(response.isSuccess()).toBe(true)
        expect(response.value).toEqual({
            accountId: '35619777000113',
            conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
            partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
            payableId: '199'
        })
    })
})
