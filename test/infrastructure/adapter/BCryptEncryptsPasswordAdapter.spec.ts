import bcrypt from 'bcrypt'
import { EncryptsPassword } from '../../../src/data/protocol/EncryptsPassword'
import { BCryptEncryptsPasswordAdapter } from '../../../src/infrastructure/adapter/BCryptEncryptsPasswordAdapter'

describe('BCryptEncryptsPasswordAdapter', () => {
    let encrypt: EncryptsPassword

    beforeAll(() => {
        encrypt = new BCryptEncryptsPasswordAdapter(12)
    })
    test('should encrypt password is valid', async () => {
        const password = 'P4ssW0rd@Valid'
        const passwordEncrypted = await encrypt.encrypt(password)

        expect(passwordEncrypted.value).toBeTruthy()
        expect(passwordEncrypted.isSuccess()).toBe(true)
    })

    test('should return failure when bcrypt throws error', async () => {
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            throw new Error('Any error')
        })

        const password = 'P4ssW0rd@Valid'
        const passwordEncrypted = await encrypt.encrypt(password)
        expect(passwordEncrypted.isFailure()).toBe(true)
    })
})
