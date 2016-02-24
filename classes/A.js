class A {
  str: string
  n: number

  // ?string may be null or undefined
  constructor(str: ?string, n: ?number) {
    this.str = str || 'hello'
    this.n = n || 0
  }

  setString(str: string) {
    this.str = str
  }

  toString(): string {
    return `Your string is ${this.str}`
  }

  toNumber(): number {
    return this.n
  }

  static staticMethod(str: ?string) {
    return `[${str}]`
  }

  static newInstance() {
    return new A('from newInstance', 0)
  }

  static prop = 'prop'
}

module.exports = A
