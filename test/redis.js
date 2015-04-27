var _      = require('lodash');
var async  = require('async');
var redis  = require('redis');
var should = require('should');

describe('Redis', function () {
  var client;
  before(function (done) {
    client = redis.createClient();
    client.on('error', function (err) {
      console.log('Error ' + err);
    });
    done();
  });

  after(function (done) {
    client.quit();
    done();
  });

  it('set - get', function (done) {
    var key = 'key', value = 'value';
    async.waterfall([
      function (callback) {
        client.set(key, value, callback);
      },
      function (res, callback) {
        res.should.eql('OK');
        client.get(key, callback);
      }
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql(value);
      done();
    });
  });

  it('storing hash', function (done) {
    var key = 'key 0';
    async.waterfall([
      function (callback) {
        client.del(key, callback);
      },
      function (r, callback) {
        client.hset(key, 'property', 'value', callback);
      },
      function (res, callback) {
        res.should.eql(1);
        client.hkeys(key, callback)
      },
      function (res, callback) {
        res.should.eql(['property']);
        client.hgetall(key, callback);
      },
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql({ property: 'value' });
      done();
    });
  });

  it('storing hash', function (done) {
    var key = 'key A';
    var obj = {
      property1: 'value1',
      property2: 'value2',
      property3: 'value3'
    };
    async.waterfall([
      function (callback) {
        client.hmset(key, 'property1', 'value1',
         'property2', 'value2', 'property3', 'value3', callback);
      },
      function (result, callback) {
        client.hgetall(key, callback);
      }
    ], function (err, result) {
      should.not.exist(err);
      result.should.eql(obj);
      done();
    });
  });

  describe('storing nested object', function() {
    var key = 'key B';
    var obj = {
      key1: 'value1',
      key2: { subKey: 'value2' },
      key3: { subKey: new Date().getTime() }
    };

    it('can\'t storing nested objects', function (done) {
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

    it('storing nested objects in a string', function (done) {
      var prop = 'prop';
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
        var r = JSON.parse(result);
        /* Dates have to be converted */
        r.key3.subkey = new Date(parseFloat(r.key3.subKey));
        done();
      });
    });

    it('storing nested objects in a string--', function (done) {
      var object = { id1: JSON.stringify(obj) };
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

  });

});
