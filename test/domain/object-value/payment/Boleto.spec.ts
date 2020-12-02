import { InvalidBoletoParametersError } from '../../../../src/domain/errors/InvalidBoletoParametersError'
import { Boleto } from '../../../../src/domain/object-value/payment/Boleto'

describe('Boleto', () => {
    test('should return failure when brokerCustomerId is invalid', () => {
        const sut = Boleto.create({
            brokerCustomerId: 'invalid',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'brokerCustomerId' equals 'invalid' is invalid!")
    })

    test('should return failure when brokerCustomerId is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: undefined,
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'brokerCustomerId' equals 'undefined' is invalid!")
    })

    test('should return failure when brokerInvoiceId is invalid', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'invalid',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'brokerInvoiceId' equals 'invalid' is invalid!")
    })

    test('should return failure when brokerInvoiceId is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: undefined,
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'brokerInvoiceId' equals 'undefined' is invalid!")
    })

    test('should return failure when referenceId is invalid', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: 'invalid',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'referenceId' equals 'invalid' is invalid!")
    })

    test('should return failure when referenceId is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: undefined,
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'referenceId' equals 'undefined' is invalid!")
    })

    test('should return failure when referenceOrigin is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: undefined,
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'referenceOrigin' equals 'undefined' is invalid!")
    })

    test('should return failure when referenceOrigin is empty', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: '',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'referenceOrigin' equals '' is invalid!")
    })

    test('should return failure when pdf is invalid', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'url-invalid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'pdf' equals 'url-invalid' is invalid!")
    })

    test('should return failure when pdf is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: undefined,
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'pdf' equals 'undefined' is invalid!")
    })

    test('should return failure when visibleBarcode is invalid', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '000100',
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'visibleBarcode' equals '000100' is invalid!")
    })

    test('should return failure when visibleBarcode is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: undefined,
            dueDate: new Date()
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'visibleBarcode' equals 'undefined' is invalid!")
    })

    test('should return failure when dueDate is undefined', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: undefined
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidBoletoParametersError)
        expect((sut.value as InvalidBoletoParametersError).message)
            .toBe("'dueDate' equals 'undefined' is invalid!")
    })

    test('should return success', () => {
        const sut = Boleto.create({
            brokerCustomerId: '2671DA9267DD4D21B24FC94D0B0B8063',
            brokerInvoiceId: 'CEFF0BAA35D74A00B2737B1A0497A8D1',
            referenceId: '5f0f0122a1c0f50007eda110',
            referenceOrigin: 'order',
            pdf: 'https://url/valid',
            visibleBarcode: '00190500954014481606906809350314337370000000100',
            dueDate: new Date()
        })

        expect(sut.isSuccess()).toBe(true)
    })
})
