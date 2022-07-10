class StaticA {

  constructor() {
    this.str = 'from static class';
  }

  toString() {
    return `Your string is ${this.str}`;
  }

}

export default new StaticA();
