
class C {
  constructor(...args) {
    this.args = args
  }
  * [Symbol.iterator] () {
    for (let arg of this.args) {
      yield arg
    }
  }
}

module.exports = C
