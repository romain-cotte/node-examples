const mongodb = require('mongodb');
const should = require('should');

const url = 'mongodb://localhost:27017/node-examples';

describe('Mongodb', () => {
  let db, collection;

  before(async () => {
    db = await mongodb.MongoClient.connect(url);
    collection = db.collection('documents');
  });

  after(() => db.close());

  beforeEach(async () => {
    await collection.remove()
    await collection.insert([{ a : 1 }, { a : 2 }, { a : 3 }]);
  });

  it('should insert 3 documents into the document collection', done => {
    collection
      .insert([
        { a : 1 }, { a : 2 }, { a : 3 }
      ], (err, result) => {
        should.not.exist(err);
        result.result.n.should.eql(3);
        result.ops.length.should.eql(3);
        done();
      });
  });

  it('should retrieve documents of document collection', done => {
    collection.find({ a: 1 }).toArray((err, documents) => {
      should.not.exist(err);
      documents.length.should.eql(1);
      done();
    });
  });

  it('should update a document', done => {
    collection.update({ a : 2 }, { $set: { b : 1 } })
      .then(result => {
        result.result.n.should.eql(1);
        done();
      });
  });

  it('should find one document', done => {
    collection.findOne({ })
      .then(res => {
        res.should.have.property('a');
        done();
      })
      .catch(done);
  });

  it('should find the last document', done => {
    collection.findOne({}, { sort: [['_id','desc']] })
      .then(res => {
        res.should.have.property('a');
        done();
      })
      .catch(done);
  });

});

