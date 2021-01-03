import { InvalidBoletoParametersError } from '@/domain/errors/InvalidBoletoParametersError'
import { Boleto } from '@/domain/object-value/payment/Boleto'

const boletoData = {
    brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
    brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
    referenceId: '5f0f0122a1c0f50007eda110',
    referenceOrigin: 'order',
    pdf: 'https://url/valid',
    visibleBarcode: '00190500954014481606906809350314337370000000100',
    dueDate: new Date()
}

const responseIsValid = (sut: any, message: string) => {
    expect(sut.isFailure()).toBe(true)
    expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
    expect((sut.value as InvalidBoletoParametersError).message)
        .toBe(message)
}

describe('Boleto', () => {
    test('should return failure when brokerCustomerId is invalid', () => {
        const sut = Boleto.create({ ...boletoData, brokerCustomerId: 'invalid' })
        responseIsValid(sut, "'brokerCustomerId' equals 'invalid' is invalid!")
    })

    test('should return failure when brokerCustomerId is undefined', () => {
        const sut = Boleto.create({ ...boletoData, brokerCustomerId: undefined })
        responseIsValid(sut, "'brokerCustomerId' equals 'undefined' is invalid!")
    })

    test('should return failure when brokerInvoiceId is invalid', () => {
        const sut = Boleto.create({ ...boletoData, brokerInvoiceId: 'invalid' })
        responseIsValid(sut, "'brokerInvoiceId' equals 'invalid' is invalid!")
    })

    test('should return failure when brokerInvoiceId is undefined', () => {
        const sut = Boleto.create({ ...boletoData, brokerInvoiceId: undefined })
        responseIsValid(sut, "'brokerInvoiceId' equals 'undefined' is invalid!")
    })

    test('should return failure when referenceId is invalid', () => {
        const sut = Boleto.create({ ...boletoData, referenceId: 'invalid' })
        responseIsValid(sut, "'referenceId' equals 'invalid' is invalid!")
    })

    test('should return failure when referenceId is undefined', () => {
        const sut = Boleto.create({ ...boletoData, referenceId: undefined })
        responseIsValid(sut, "'referenceId' equals 'undefined' is invalid!")
    })

    test('should return failure when referenceOrigin is undefined', () => {
        const sut = Boleto.create({ ...boletoData, referenceOrigin: undefined })
        responseIsValid(sut, "'referenceOrigin' equals 'undefined' is invalid!")
    })

    test('should return failure when referenceOrigin is empty', () => {
        const sut = Boleto.create({ ...boletoData, referenceOrigin: '' })
        responseIsValid(sut, "'referenceOrigin' equals '' is invalid!")
    })

    test('should return failure when pdf is invalid', () => {
        const sut = Boleto.create({ ...boletoData, pdf: 'url-invalid' })
        responseIsValid(sut, "'pdf' equals 'url-invalid' is invalid!")
    })

    test('should return failure when pdf is undefined', () => {
        const sut = Boleto.create({
            ...boletoData, pdf: undefined
        })
        responseIsValid(sut, "'pdf' equals 'undefined' is invalid!")
    })

    test('should return failure when visibleBarcode is invalid', () => {
        const sut = Boleto.create({ ...boletoData, visibleBarcode: '000100' })
        responseIsValid(sut, "'visibleBarcode' equals '000100' is invalid!")
    })

    test('should return failure when visibleBarcode is undefined', () => {
        const sut = Boleto.create({ ...boletoData, visibleBarcode: undefined })
        responseIsValid(sut, "'visibleBarcode' equals 'undefined' is invalid!")
    })

    test('should return failure when dueDate is undefined', () => {
        const sut = Boleto.create({
            ...boletoData, dueDate: undefined
        })
        responseIsValid(sut, "'dueDate' equals 'undefined' is invalid!")
    })

    test('should return success', () => {
        const sut = Boleto.create(boletoData)

        expect(sut.isSuccess()).toBe(true)
        expect(sut.value as Boleto).toMatchObject({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: expect.any(Date)
        })
    })
})
