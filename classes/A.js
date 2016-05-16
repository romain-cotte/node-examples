class A {

  // ?string may be null or undefined
  constructor(str, n) {
    this.str = str || 'hello'
    this.n = n || 0
  }

  setString(str) {
    this.str = str
  }

  toString() {
    return `Your string is ${this.str}`
  }

  toNumber() {
    return this.n
  }

  static staticMethod(str) {
    return `[${str}]`
  }

  static newInstance() {
    return new A('from newInstance', 0)
  }

  // static prop = 'prop'
}

module.exports = A
