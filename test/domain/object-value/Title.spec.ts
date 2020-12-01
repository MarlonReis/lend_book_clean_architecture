import { InvalidTitleError } from '../../../src/domain/errors'
import { Title } from '../../../src/domain/object-value'

describe('Title', () => {
    test('should create title', () => {
        const sut = Title.create('Any Title')

        expect(sut.isSuccess()).toBe(true)
        expect(sut.value).toBeInstanceOf(Title)
        expect((sut.value as Title).getValue()).toBe('Any Title')
    })

    test('should return error when received invalid name', () => {
        const sut = Title.create('An')

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidTitleError)
        expect((sut.value as InvalidTitleError).message)
        .toBe("Attribute 'title' equals An is invalid!")
    })

    test('should return error when received undefined name', () => {
        const sut = Title.create(undefined)

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidTitleError)
        expect((sut.value as InvalidTitleError).message)
        .toBe("Attribute 'title' equals undefined is invalid!")
    })
})
