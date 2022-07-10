import A from './A.js';

class B extends A {
  /* Overwrite A's method */
  constructor() {
    super();
  }

  toString() {
    return `Inside B, your string is ${this.str}`;
  }

  toStringFromSuper () {
    return super.toString() + '!!!';
  }

  * [Symbol.iterator] () {
    yield 1;
    yield 2;
    yield 3;
  }
}

export default B;
