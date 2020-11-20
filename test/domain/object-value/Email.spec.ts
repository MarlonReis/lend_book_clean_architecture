import Email from '../../../src/domain/object-value/Email'

describe('Email', () => {
    test('should create valid email', () => {
        const result = Email.create('valid@email.com.br')
        expect(result.isSuccess()).toBe(true)
        expect(result.value).toBeInstanceOf(Email)
    })
})
