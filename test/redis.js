'use strict';

const async  = require('async');
const redis  = require('redis');
const should = require('should');

describe('Redis', () => {
  let client;
  before((done) => {
    client = redis.createClient();
    client.on('error', function (err) {
      console.log('Error ' + err);
    });
    done();
  });

  after((done) => {
    client.quit();
    done();
  });

  it('set - get', (done) => {
    const key = 'key', value = 'value';
    async.waterfall([
      function (next) {
        client.set(key, value, next);
      },
      function (res, next) {
        res.should.eql('OK');
        client.get(key, next);
      }
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql(value);
      done();
    });
  });

  it('incr', (done) => {
    let key = 'key0', value = 1;
    async.waterfall([
      function (next) {
        client.set(key, value, next);
      },
      function (res, next) {
        res.should.eql('OK');
        client.incr(key, next);
      }
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql(++value);
      done();
    });
  });

  it('should delete a key', (done) => {
    const key = 'key';
    const value = 'value';
    async.waterfall([
      function (next) {
        client.set(key, value, next);
      },
      function (res, next) {
        client.del(key, next);
      },
      function (res, next) {
        client.get(key, next);
      }
    ], function (err, res) {
      (res === null).should.be.true;
      done();
      // result now equals 'done'
    });
  });

  it('first incr', (done) => {
    const key = 'key1';
    async.waterfall([
      function (next) {
        client.del(key, next);
      },
      function (res, next) {
        client.incr(key, next);
      }
    ], function (err, res) {
      res.should.eql(1);
      done();
      // result now equals 'done'
    });
  });

  it('storing hash', (done) => {
    const key = 'key 0';
    async.waterfall([
      function (next) {
        client.del(key, next);
      },
      function (r, next) {
        client.hset(key, 'property', 'value', next);
      },
      function (res, next) {
        res.should.eql(1);
        client.hkeys(key, next);
      },
      function (res, next) {
        res.should.eql(['property']);
        client.hgetall(key, next);
      },
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql({ property: 'value' });
      done();
    });
  });

  it('storing hash', (done) => {
    const key = 'key A';
    const obj = {
      property1: 'value1',
      property2: 'value2',
      property3: 'value3'
    };
    async.waterfall([
      function (next) {
        client.hmset(key, 'property1', 'value1',
         'property2', 'value2', 'property3', 'value3', next);
      },
      function (result, next) {
        client.hgetall(key, next);
      }
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql(obj);
      done();
    });
  });

  describe('storing nested object', () => {
    const key = 'key B';
    const obj = {
      key1: 'value1',
      key2: { subKey: 'value2' },
      key3: { subKey: new Date().getTime() }
    };

    it('can\'t storing nested objects', (done) => {
      async.waterfall([
        function (next) {
          client.del(key, next);
        },
        function (result/* type number */, next) {
          [ 0, 1 ].indexOf(result).should.be.above(-1);
          client.hmset(key, obj, next);
        },
        function (result, next) {
          result.should.equal('OK');
          client.hgetall(key, next);
        },
      ], function (err, result) {
        should.not.exist(err);
        result.key1.should.eql(obj.key1);
        /* result.key2.subKey is undefined */
        done();
      });
    });

    it('storing nested objects in a string', (done) => {
      const prop = 'prop';
      async.waterfall([
        function (next) {
          client.del(key, next);
        },
        function (result, next) {
          client.hset(key, prop, JSON.stringify(obj), next);
        },
        function (result, next) {
          result.should.equal(1);
          client.hget(key, prop, next);
        },
      ], function (err, result) {
        should.not.exist(err);
        result.should.eql(JSON.stringify(obj));
        const r = JSON.parse(result);
        /* Dates have to be converted */
        r.key3.subkey = new Date(parseFloat(r.key3.subKey));
        done();
      });
    });

    it('storing nested objects in a string--', (done) => {
      const object = { id1: JSON.stringify(obj) };
      async.waterfall([
        function (next) {
          client.del(key, next);
        },
        function (result, next) {
          client.hmset(key, object, next);
        },
        function (result, next) {
          result.should.equal('OK');
          client.hgetall(key, next);
        },
      ], function (err, result) {
        should.not.exist(err);
        result.should.eql(object);
        done();
      });
    });

    it('hmset does not overwrite other properties', (done) => {
      const object = { startingProp1: 1, startingProp2: 2 };
      async.waterfall([
        function (next) {
          client.del(key, next);
        },
        function (res, next) {
          client.hmset(key, object, next);
        },
        function (result, next) {
          result.should.equal('OK');
          client.hmset(key, { nextProp1: 3, nextProp2: 4 }, next);
        },
        function (result, next) {
          result.should.equal('OK');
          client.hgetall(key, next);
        }
      ], function (err, result) {
        result.startingProp1.should.eql('1');
        result.startingProp2.should.eql('2');
        result.nextProp1.should.eql('3');
        result.nextProp2.should.eql('4');
        done(err);
      });
    });

  });

});
