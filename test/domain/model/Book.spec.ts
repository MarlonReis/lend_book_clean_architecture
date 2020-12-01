import { InvalidTitleError } from '../../../src/domain/errors'
import { Book } from '../../../src/domain/model/book/Book'
import { User } from '../../../src/domain/model/user/User'
import { Title } from '../../../src/domain/object-value'
describe('Book', () => {
    test('should create a book with success', () => {
        const sut = Book.create({
            title: 'Any Title',
            owner: {
                id: 'any-valid-id',
                email: 'any@email.com.br',
                name: 'Any Name',
                password: 'Password@Valid'
            }
        })

        expect(sut.isSuccess()).toBe(true)
        expect(sut.value).toBeInstanceOf(Book)
        expect(sut.value).toMatchObject({
            title: expect.any(Title),
            owner: expect.any(Object)
        })

        expect((sut.value as Book).getOwner()).toBeInstanceOf(User)
        expect((sut.value as Book).getTitle()).toBeInstanceOf(Title)
    })

    test('should return failure when title is invalid', () => {
        const sut = Book.create({
            title: 'in',
            owner: {
                id: 'any-valid-id',
                email: 'any@email.com.br',
                name: 'Any Name',
                password: 'Password@Valid'
            }
        })
        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidTitleError)
    })

    test('should return failure when owner is invalid', () => {
        const sut = Book.create({
            title: 'Any Valid',
            owner: {
                email: undefined,
                name: undefined,
                password: undefined
            }
        })
        expect(sut.isFailure()).toBe(true)
    })
})
