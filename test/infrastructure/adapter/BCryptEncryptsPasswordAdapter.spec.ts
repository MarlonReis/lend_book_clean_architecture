import { EncryptsPassword } from '../../../src/data/protocol/EncryptsPassword'
import { Password } from '../../../src/domain/object-value'
import { BCryptEncryptsPasswordAdapter } from '../../../src/infrastructure/adapter/BCryptEncryptsPasswordAdapter'

describe('BCryptEncryptsPasswordAdapter', () => {
    test('should encrypt password is valid', async () => {
        const encrypt: EncryptsPassword = new BCryptEncryptsPasswordAdapter()
        const passwordOrError = Password.create('P4ssW0rd@Valid')

        if (passwordOrError.isFailure()) {
            fail("Shouldn't have entered this conditional")
        }

        const password: Password = passwordOrError.value
        const passwordEncrypted = await encrypt.encrypt(password)

        expect(passwordEncrypted.value).toMatchObject({
            value: expect.any(String)
        })
    })
})
