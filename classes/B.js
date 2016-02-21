import A from './A'

class B extends A {
  /* Overwrite A's method */
  toString(): string {
    return `Inside B, your string is ${this.str}`
  }
}

module.exports = B
