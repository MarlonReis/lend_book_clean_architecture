export class Name {
  private readonly _value: string

  constructor (name: string) {
    this._value = name
  }

  get value (): string {
    return this._value
  }
}
