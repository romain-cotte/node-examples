class ClassA {
  str: string;
  n: number;

  constructor(str: string, n: number) {
    this.str = str || 'hello'
    this.n = n || 0
  }

  toString(): string {
    return `Your string is ${this.str}`
  }
  toNumber(): number {
    return this.n
  }
}

module.exports = ClassA

