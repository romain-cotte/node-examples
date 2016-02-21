'use strict'

import async from 'async'
import redis from 'redis'
import should from 'should'

describe('Redis', () => {
  let client
  before(() => {
    client = redis.createClient()
    client.on('error', err => {
      console.log('Error', err) //eslint-disable-line
    })
  })

  after(() => {
    client.quit()
  })

  it('set - get', done => {
    const key = 'key', value = 'value'
    async.waterfall([
      (next) => {
        client.set(key, value, next)
      },
      (res, next) => {
        res.should.eql('OK')
        client.get(key, next)
      }
    ], (err, result) => {
      should.not.exist(err)
      result.should.eql(value)
      done()
    })
  })

  it('incr', done => {
    let key = 'key0', value = 1
    async.waterfall([
      (next) => {
        client.set(key, value, next)
      },
      (res, next) => {
        res.should.eql('OK')
        client.incr(key, next)
      }
    ], (err, result) => {
      should.not.exist(err)
      result.should.eql(++value)
      done()
    })
  })

  it('should delete a key', done => {
    const key = 'key'
    const value = 'value'
    async.waterfall([
      (next) => {
        client.set(key, value, next)
      },
      (res, next) => {
        client.del(key, next)
      },
      (res, next) => {
        client.get(key, next)
      }
    ], (err, res) => {
      (res === null).should.be.true()
      done()
    })
  })

  it('first incr', done => {
    const key = 'key1'
    async.waterfall([
      (next) => {
        client.del(key, next)
      },
      (res, next) => {
        client.incr(key, next)
      }
    ], (err, res) => {
      res.should.eql(1)
      done()
    })
  })

  it('storing hash', done => {
    const key = 'key 0'
    async.waterfall([
      (next) => {
        client.del(key, next)
      },
      (r, next) => {
        client.hset(key, 'property', 'value', next)
      },
      (res, next) => {
        res.should.eql(1)
        client.hkeys(key, next)
      },
      (res, next) => {
        res.should.eql(['property'])
        client.hgetall(key, next)
      }
    ], (err, result) => {
      should.not.exist(err)
      result.should.eql({ property: 'value' })
      done()
    })
  })

  it('storing hash', done => {
    const key = 'key A'
    const obj = {
      property1: 'value1',
      property2: 'value2',
      property3: 'value3'
    }
    async.waterfall([
      (next) => {
        client.hmset(key, 'property1', 'value1',
         'property2', 'value2', 'property3', 'value3', next)
      },
      (result, next) => {
        client.hgetall(key, next)
      }
    ], (err, result) => {
      should.not.exist(err)
      result.should.eql(obj)
      done()
    })
  })

  describe('storing nested object', () => {
    const key = 'key B'
    const obj = {
      key1: 'value1',
      key2: { subKey: 'value2' },
      key3: { subKey: new Date().getTime() }
    }

    it('can\'t storing nested objects', done => {
      async.waterfall([
        (next) => {
          client.del(key, next)
        },
        (result/* type number */, next) => {
          [ 0, 1 ].indexOf(result).should.be.above(-1)
          client.hmset(key, obj, next)
        },
        (result, next) => {
          result.should.equal('OK')
          client.hgetall(key, next)
        }
      ], (err, result) => {
        should.not.exist(err)
        result.key1.should.eql(obj.key1)
        /* result.key2.subKey is undefined */
        done()
      })
    })

    it('storing nested objects in a string', done => {
      const prop = 'prop'
      async.waterfall([
        (next) => {
          client.del(key, next)
        },
        (result, next) => {
          client.hset(key, prop, JSON.stringify(obj), next)
        },
        (result, next) => {
          result.should.equal(1)
          client.hget(key, prop, next)
        }
      ], (err, result) => {
        should.not.exist(err)
        result.should.eql(JSON.stringify(obj))
        const r = JSON.parse(result)
        /* Dates have to be converted */
        r.key3.subkey = new Date(parseFloat(r.key3.subKey))
        done()
      })
    })

    it('storing nested objects in a string--', done => {
      const object = { id1: JSON.stringify(obj) }
      async.waterfall([
        (next) => {
          client.del(key, next)
        },
        (result, next) => {
          client.hmset(key, object, next)
        },
        (result, next) => {
          result.should.equal('OK')
          client.hgetall(key, next)
        }
      ], (err, result) => {
        should.not.exist(err)
        result.should.eql(object)
        done()
      })
    })

    it('hmset does not overwrite other properties', done => {
      const object = { startingProp1: 1, startingProp2: 2 }
      async.waterfall([
        (next) => {
          client.del(key, next)
        },
        (res, next) => {
          client.hmset(key, object, next)
        },
        (result, next) => {
          result.should.equal('OK')
          client.hmset(key, { nextProp1: 3, nextProp2: 4 }, next)
        },
        (result, next) => {
          result.should.equal('OK')
          client.hgetall(key, next)
        }
      ], (err, result) => {
        result.startingProp1.should.eql('1')
        result.startingProp2.should.eql('2')
        result.nextProp1.should.eql('3')
        result.nextProp2.should.eql('4')
        done(err)
      })
    })

  })

})
