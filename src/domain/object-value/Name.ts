import { Either, success, failure } from '../../shared/Either'
import { InvalidNameError } from '../errors'

export class Name {
  private readonly _value: string

  private constructor (name: string) {
    this._value = name
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (name && /.{3,}/.test(name)) {
      return success(new Name(name))
    }
    return failure(new InvalidNameError(name))
  }

  get value (): string {
    return this._value
  }
}
