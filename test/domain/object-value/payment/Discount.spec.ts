import { InvalidDiscountParametersError } from '@/domain/errors'
import { Discount } from '@/domain/object-value/payment/Discount'

const discountData = {
    accountId: '35619777000113',
    conciliationId: 'fd730533-3b77-4400-864d-55ffd81487ec-PUR',
    partnerId: 'fd730533-3b77-4400-864d-55ffd81487ec',
    payableId: '199'
}

const responseFailure = (response: any, message: string) => {
    expect(response.isFailure()).toBe(true)
    expect(response.value).toBeInstanceOf(InvalidDiscountParametersError)
    expect((response.value as InvalidDiscountParametersError).message)
        .toBe(message)
}

describe('Discount', () => {
    test('should return failure when accountId is invalid', () => {
        const response = Discount.create({
            ...discountData, accountId: 'invalid'
        })

        responseFailure(response, "'accountId' equals 'invalid' is invalid!")
    })

    test('should return failure when accountId is undefined', () => {
        const response = Discount.create({
            ...discountData,
            accountId: undefined
        })

        responseFailure(response, "'accountId' equals 'undefined' is invalid!")
    })

    test('should return failure when conciliationId is empty', () => {
        const response = Discount.create({
            ...discountData, conciliationId: ''
        })

        responseFailure(response, "'conciliationId' equals '' is invalid!")
    })

    test('should return failure when conciliationId is undefined', () => {
        const response = Discount.create({
            ...discountData, conciliationId: undefined
        })

        responseFailure(response, "'conciliationId' equals 'undefined' is invalid!")
    })

    test('should return failure when partnerId is invalid', () => {
        const response = Discount.create({
            ...discountData, partnerId: 'invalid'
        })

        responseFailure(response, "'partnerId' equals 'invalid' is invalid!")
    })

    test('should return failure when partnerId is undefined', () => {
        const response = Discount.create({
            ...discountData, partnerId: undefined
        })

        responseFailure(response, "'partnerId' equals 'undefined' is invalid!")
    })

    test('should return failure when payableId is invalid', () => {
        const response = Discount.create({
            ...discountData, payableId: 'invalid'
        })

        responseFailure(response, "'payableId' equals 'invalid' is invalid!")
    })

    test('should return failure when payableId is undefined', () => {
        const response = Discount.create({
            ...discountData, payableId: undefined
        })

        responseFailure(response, "'payableId' equals 'undefined' is invalid!")
    })

    test('should return success', () => {
        const response = Discount.create(discountData)

        expect(response.isSuccess()).toBe(true)
        expect(response.value).toEqual(discountData)
    })
})
