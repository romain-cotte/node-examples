class StaticA {
  str: string

  constructor() {
    this.str = 'from static class'
  }

  toString(): string {
    return `Your string is ${this.str}`
  }

}

module.exports = new StaticA()
