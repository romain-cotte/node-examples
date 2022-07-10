import mongodb from 'mongodb';
import should from 'should' //eslint-disable-line
import { expect } from 'chai';

const url = 'mongodb://localhost:27017';

describe('Mongodb', () => {
  let client, collection;
  let shared;

  before(async () => {
    client = new mongodb.MongoClient(url);
    await client.connect();
    collection = client.db('node-examples').collection('documents');
    shared = {};
  });

  after(() => client.close());

  beforeEach(async () => {
    await collection.deleteMany({});
    shared.documents = await collection.insertMany([{ a : 1 }, { a : 2 }, { a : 3 }]);
  });

  it('should insert 3 documents into the document collection', async () => {
    expect(shared.documents.insertedCount).to.eql(3);
  });

  it('should retrieve documents of document collection', async () => {
    const documents = await collection.find({ a: 1 }).toArray();
    expect(documents.length).to.eql(1);
  });

  it('should update a document', async () => {
    const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
    expect(updateResult).to.eql({
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
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

