import async from 'async'
import should from 'should'

/**
 * See https://github.com/caolan/async
 */
describe('async', () => {

  it('waterfall', done => {
    async.waterfall([
      next => {
        next(null, 'one', 'two')
      },
      (arg1, arg2, next) => {
        arg1.should.eql('one')
        arg2.should.eql('two')
        next(null, 'done')
      }
    ], (err, result) =>  {
      should.not.exist(err)
      result.should.eql('done')
      done()
    })
  })

  it('parallel', done => {
    async.parallel([
      next => {
        next(null, 'one')
      },
      next => {
        next(null, 'two')
      }
    ], (err, results) => { // Optional
      let arg2 = results.pop()
      let arg1 = results.pop()
      arg1.should.eql('one')
      arg2.should.eql('two')
      done()
    })
  })

  it('series', done => {
    async.series([
      next => {
        next(null, 'one')
      },
      next => {
        next(null, 'two')
      }
    ], (err, results) => {
      let arg2 = results.pop()
      let arg1 = results.pop()
      arg1.should.eql('one')
      arg2.should.eql('two')
      done()
    })
  })

  it('map', done => {
    let AsyncSquaringLibrary = {
      squareExponent: 2,
      square: function (number, callback) {
        let result = Math.pow(number, this.squareExponent)
        setTimeout(() => {
          callback(null, result)
        }, 50)
      }
    }

    async.map([1, 2, 3],
              AsyncSquaringLibrary.square.bind(AsyncSquaringLibrary),
              (err, result) => {
                should.not.exist(err)
                result.should.eql([1, 4, 9])
                done()
              })
  })

  it('error', done => {
    async.waterfall([
      next => {
        // notDefined.id
        /* Throw an error here */
        next(null, 'result')
      }
    ], (err/*, result === 'result' */) => {
      should.not.exist(err)
      done()
    })
  })

  it('async process.nextTick', done => {
    const arr = []
    async.series([
      next => {
        arr.push(0)
        process.nextTick(next)
      },
      next => {
        arr.push(1)
        next(null)
      }
    ], err => {
      should.not.exist(err)
      arr.should.eql([0, 2, 1])
      done()
    })
    arr.push(2)
  })

})
