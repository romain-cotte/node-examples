class A {
  str: string
  n: number

  // ?string may be null or undefined
  constructor(str: ?string, n: ?number) {
    this.str = str || 'hello'
    this.n = n || 0
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
}

module.exports = A
