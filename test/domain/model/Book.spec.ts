import { InvalidParamError } from '@/domain/errors'
import { Book } from '@/domain/model/Book'

describe('Book', () => {
    test('should create a book with success', () => {
        const sut = Book.create({
            title: 'Any Title',
            ownerId: '3f4129cc-368e-11eb-adc1-0242ac120002'
        })

        expect(sut.isSuccess()).toBe(true)
        expect(sut.value).toBeInstanceOf(Book)
        expect(sut.value).toMatchObject({
            title: 'Any Title',
            ownerId: '3f4129cc-368e-11eb-adc1-0242ac120002'
        })
    })

    test('should return failure when title is invalid', () => {
        const response = Book.create({
            title: 'in',
            ownerId: 'any-valid-id'
        })
        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(InvalidParamError)
        expect(response.value).toMatchObject({
            message: "Attribute 'title' equals 'in' is invalid!",
            name: 'InvalidParamError'
        })
    })

    test('should return failure when ownerId is invalid', () => {
        const response = Book.create({
            title: 'Any Valid',
            ownerId: 'invalid-id'
        })
        expect(response.isFailure()).toBe(true)
        expect(response.value).toMatchObject({
            message: "Attribute 'ownerId' equals 'invalid-id' is invalid!",
            name: 'InvalidParamError'
        })
    })
})
