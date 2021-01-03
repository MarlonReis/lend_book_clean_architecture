import { InvalidIdEntityError } from '@/domain/errors'
import { IdEntity } from '@/domain/object-value'

describe('IdEntity', () => {
    test('should create IdEntity with valid id', () => {
        const sut = IdEntity.create('valid-id')

        expect(sut.isSuccess()).toBe(true)
        expect((sut.value as any).getValue()).toBe('valid-id')
        expect(sut.value).toMatchObject({
            value: expect.any(String)
        })
    })

    test('should return failure when id undefined', () => {
        const sut = IdEntity.create(undefined)
        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toEqual(new InvalidIdEntityError(undefined))
    })
})
