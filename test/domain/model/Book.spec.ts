import { Book } from '../../../src/domain/model/book/Book'
import { Title } from '../../../src/domain/object-value'
describe('Book', () => {
    test('should create a book', () => {
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
            owner: expect.any(Object),
            getTitle: expect.any(Function),
            getOwner: expect.any(Function)
        })
    })
})
