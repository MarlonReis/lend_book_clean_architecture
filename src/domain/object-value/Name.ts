import { Either, success, failure } from '../../shared/Either'

export class Name {
  readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  static create (name: string): Either<Error, Name> {
    if (name.length > 0) {
      return success(new Name(name))
    }
    return failure(new Error('Error'))
  }
}
