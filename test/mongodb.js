'use strict';

var mongodb = require('mongodb');
var should  = require('should');

var url = 'mongodb://localhost:27017/node-examples';

describe('Mongodb connection', function() {
  it('should connect to mongodb', function(done) {
    mongodb.MongoClient.connect(url, function (err, db) {
      should.not.exist(err);
      console.log(db);
      db.close();
      done();
    });
  });
});

