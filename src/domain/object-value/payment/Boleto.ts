import { Either, failure, success } from '../../../shared/Either'
import { InvalidBoletoParametersError } from '../../errors/InvalidBoletoParametersError'

const fields = ['brokerCustomerId', 'brokerInvoiceId', 'referenceId', 'referenceOrigin',
    'pdf', 'visibleBarcode', 'dueDate']

const isInvalid = {
    brokerCustomerId: (value: string): boolean => (!value || !(/^[0-9A-F]{32}/.test(value))),
    brokerInvoiceId: (value: string): boolean => (!value || !(/^[0-9A-F]{28,}/.test(value))),
    referenceId: (value: string): boolean => (!value || !(/^[0-9aA-fF]{23,}/.test(value))),
    referenceOrigin: (value: string): boolean => (!value || !(/.{3,}/.test(value))),
    pdf: (value: string): boolean => (!value || !(/(http[s]?:\/\/)?([^\\/\s]+\/)(.*)/.test(value))),
    dueDate: (value: any): boolean => (!value),
    visibleBarcode: (value: string): boolean => (!value || !(/[0-9]{30,}/.test(value)))
}

export class Boleto {
    public readonly brokerCustomerId: string
    public readonly brokerInvoiceId: string
    public readonly referenceId: string
    public readonly referenceOrigin: string
    public readonly pdf: string
    public readonly visibleBarcode: string
    public readonly dueDate: Date

    private constructor (
        brokerCustomerId: string, brokerInvoiceId: string, referenceId: string,
        referenceOrigin: string, pdf: string, visibleBarcode: string, dueDate: Date
    ) {
        this.brokerCustomerId = brokerCustomerId
        this.brokerInvoiceId = brokerInvoiceId
        this.referenceId = referenceId
        this.referenceOrigin = referenceOrigin
        this.pdf = pdf
        this.visibleBarcode = visibleBarcode
        this.dueDate = dueDate
        Object.freeze(this)
    }

    static create (data: any): Either<InvalidBoletoParametersError, Boleto> {
        for (const fieldName of fields) {
            const fieldValue = data[fieldName]
            if (isInvalid[fieldName](fieldValue)) {
                return failure(new InvalidBoletoParametersError(fieldName, fieldValue))
            }
        }

        return success(new Boleto(data.brokerCustomerId,
            data.brokerInvoiceId, data.referenceId,
            data.referenceOrigin, data.pdf,
            data.visibleBarcode, data.dueDate))
    }
}
