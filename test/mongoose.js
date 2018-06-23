const mongoose = require('mongoose');
const should = require('should');
mongoose.Promise = require('bluebird');

const User = require('../models').User;

describe('Mongoose', () => {
  let user;
  const userContent = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    address: {
      street: '3 rue de l\'Eglise',
      city: 'Paris'
    }
  };

  before(() => mongoose.connect('localhost:27017/node-examples'));

  beforeEach(async () => {
    user = new User(userContent);
    await User.remove();
    return user.save();
  });

  after(() => mongoose.disconnect());

  it('should create an ObjectId', () => {
    (typeof new mongoose.Types.ObjectId()).should.eql('object');
  });

  it('should create several users', async () => {
    await User.create([userContent, userContent]);
    const count = await User.count();
    count.should.eql(3);
  });

  it('should throw error on a bad ObjectId', async () => {
    try {
      await User.findOne({ _id: 'badObjectId' });
    } catch (err) {
      err.message.should.eql('Cast to ObjectId failed for value "badObjectId" at path "_id" for model "User"');
      err.name.should.eql('CastError');
      err.kind.should.eql('ObjectId');
      err.value.should.eql('badObjectId');
      err.path.should.eql('_id');
    }
  });

  it('should not find document with a wrong ObjectId', async () => {
    const u = await User.findOne({ _id: new mongoose.Types.ObjectId() });
    should.not.exist(u);
  });

  it('should not find users with a wrong ObjectId', async () => {
    const users = await User.find({ _id: new mongoose.Types.ObjectId() });
    users.should.eql([]);
  });

  it('should find one user', async () => {
    const res = await User.findOne({ _id: user._id });
    res.firstname.should.eql(userContent.firstname);
    res.lastname.should.eql(userContent.lastname);
    res.address.city.should.eql(userContent.address.city);
    res.address.street.should.eql(userContent.address.street);
  });

  it('should find one user - with a string instead of a ObjectId => it works !', async () => {
    const res = await User.findOne({ _id: user._id.toString() });
    res.firstname.should.eql(userContent.firstname);
    res.lastname.should.eql(userContent.lastname);
  });

  it('should find a user by id', async () => {
    const u = await User.findById(user._id.toString());
    u.firstname.should.eql(userContent.firstname);
    u.lastname.should.eql(userContent.lastname);
  });

  it('should save', async () => {
    const user = new User(userContent);
    const u = await user.save();
    should.exist(u);
  });

  it('should save a user with a specific _id', done => {
    userContent._id = new mongoose.Types.ObjectId();
    const user = new User(userContent);
    user.save()
      .then(u => {
        u._id.should.eql(userContent._id);
        done();
      })
      .catch(done);
  });

  it('should update', async () => {
    const r = await User.update(
        { _id: user._id },
        { firstname: 'newFirstname' }
      );
    r.ok.should.eql(1);
    r.n.should.eql(1);
  });

  it.skip('should update a field and push a new value in pets array', done => {
    User.update(
      { _id: user._id },
      { firstname: 'AAA', $push: { pets: 'dog' } }
    )
    .then(() => {
      return User.findOne({ _id: user._id });
    })
    .then(u => {
      u.firstname.should.eql('AAA');
      u.pets.should.eql(['dog']);
      done();
    })
    .catch(done);
  });

  it('should return user count', async () => {
    const c = await User.count({});
    c.should.eql(1);
  });

  it('stream', done => {
    const stream = User.find().stream();
    let count = 0;
    stream.on('data', () => {
      count++;
    });

    stream.on('error', err => {
      should.not.exist(err);
    });

    stream.on('close', () => {
      count.should.eql(1);
      done();
    });
  });

  it('should remove the user', async () => {
    const r = await user.remove();
    r.firstname.should.eql(user.firstname);
    r.lastname.should.eql(user.lastname);
    r._id.should.eql(user._id);
  });

});
