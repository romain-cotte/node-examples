import co from 'co'
import should from 'should'

describe('co', () => {

  it('generic example', done => {
    co(function* () {
      return yield Promise.resolve(true)
    })
    .then(val => {
      val.should.be.true()
      done()
    })
    .catch(done)
  })

  it('generic example with several promises', done => {
    co(function* () {
      const r = yield Promise.resolve(true)
      const s = yield Promise.resolve(r)
      return s
    })
    .then(val => {
      val.should.be.true()
      done()
    })
    .catch(done)
  })

  it('wrapping a function', done => {
    let fn = co.wrap(function* (val) {
      return yield Promise.resolve(val)
    })

    fn(true)
      .then(val => {
        val.should.be.true()
        done()
      })
  })

  it('resolve multiple promises in parallel', done => {
    co(function *() {
      let a = Promise.resolve(1)
      let b = Promise.resolve(2)
      let c = Promise.resolve(3)
      return yield [a, b, c]
    })
    .then(r => {
      r.should.eql([1, 2, 3])
      done()
    })
  })

  it('resolve object', done => {
    co(function* () {
      let res = yield {
        1: Promise.resolve(1),
        2: Promise.resolve(2),
      }
      return res
    })
    .then(r => {
      r.should.eql({ '1': 1, '2': 2 })
      done()
    })
  })

})
