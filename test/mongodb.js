'use strict';

var async   = require('async');
var mongodb = require('mongodb');
var should  = require('should');

var url = 'mongodb://localhost:27017/node-examples';

describe('Mongodb', function () {
  var db, collection;

  before(function (done) {
    async.waterfall([
      function (next) {
        /* Database connection */
        mongodb.MongoClient.connect(url, next);
      },
      function (_db, next) {
        db = _db;
        collection = db.collection('documents');
        /* Remove all documents for tests */
        collection.remove({}, next);
      }
    ], function (err) {
      done(err);
    });
  });

  after(function (done) {
    db.close();
    done();
  });

  it('should insert 3 documents into the document collection', function (done) {
    collection
      .insert([
        { a : 1 }, { a : 2 }, { a : 3 }
      ], function (err, result) {
        should.not.exist(err);
        result.result.n.should.eql(3);
        result.ops.length.should.eql(3);
        done();
      });
  });

  it('should retrieve documents of document collection', function (done) {
    collection.find({ a: 1 }).toArray(function (err, documents) {
      should.not.exist(err);
      documents.length.should.eql(1);
      done();
    });
  });

  it('should update a document', function (done) {
     collection.update({ a : 2 },
                       { $set: { b : 1 } },
                       function (err, result) {
      should.not.exist(err);
      result.result.n.should.eql(1);
      done();
    });
  });
});

