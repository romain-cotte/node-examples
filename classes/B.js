import A from './A'

class B extends A {
  /* Overwrite A's method */
  constructor() {
    super()
  }

  toString(): string {
    return `Inside B, your string is ${this.str}`
  }

  toStringFromSuper () {
    return super.toString() + '!!!';
  }

  * [Symbol.iterator] () {
    yield 1
    yield 2
    yield 3
  }
}

module.exports = B
