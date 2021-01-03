import { Either, success, failure } from '@/shared/Either'
import { InvalidNameError } from '@/domain/errors'

export class Name {
  public readonly value: string

  private constructor (name: string) {
    this.value = name
    Object.freeze(this)
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (name && /.{3,}/.test(name)) {
      return success(new Name(name))
    }
    return failure(new InvalidNameError(name))
  }

  getValue (): string {
    return this.value
  }
}
