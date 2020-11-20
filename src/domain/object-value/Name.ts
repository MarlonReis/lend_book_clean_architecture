import { Either, success, failure } from '../../shared/Either'
import InvalidNameError from '../errors/InvalidNameError'

export class Name {
  readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  static create (name: string): Either<Error, Name> {
    if (/.{3,}/.test(name)) {
      return success(new Name(name))
    }
    return failure(new InvalidNameError(name))
  }
}
