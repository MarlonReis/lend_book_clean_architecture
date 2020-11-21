import { success } from '../../src/shared/Either'

describe('Either', () => {
    test('should return object when call success function', () => {
        const response = success({ data: 'valid value' })
        expect(response.isSuccess()).toBe(true)
        expect(response.value).toMatchObject({
            data: expect.anything()
        })
    })
})
