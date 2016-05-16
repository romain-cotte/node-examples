'use strict'

const mongoose = require('mongoose')
const should = require('should')
const User = require('../models').User
const qPromise = require('q').Promise

mongoose.Promise = qPromise
const ObjectId = mongoose.Types.ObjectId

describe('Mongoose', () => {
  let user
  const userContent = {
    firstname: 'Firstname',
    lastname: 'Lastname',
    address: {
      street: '3 rue de l\'Eglise',
      city: 'Paris'
    }
  }

  before(() => {
    mongoose.connect('localhost:27017/node-examples')
  })

  beforeEach(done => {
    user = new User(userContent)
    User.remove()
      .then(user.save)
      .then(() => { done() })
      .catch(done)
  })

  after(() => {
    mongoose.disconnect()
  })

  it('should create an ObjectId', () => {
    (typeof ObjectId.createPk()).should.eql('object')
  })

  it('should create several users', done => {
    User.create([userContent, userContent])
      .then(() => {
        return User.count()
      })
      .then(c => {
        c.should.eql(3)
        done()
      })
  })

  it('should throw error on a bad ObjectId', done => {
    User.findOne({ _id: 'badObjectId' })
      .then(done)
      .catch(err => {
        err.message.should.eql('Cast to ObjectId failed for value "badObjectId" at path "_id"')
        err.name.should.eql('CastError')
        err.kind.should.eql('ObjectId')
        err.value.should.eql('badObjectId')
        err.path.should.eql('_id')
        done()
      })
  })

  it('should not find document with a wrong ObjectId', done => {
    User.findOne({ _id: ObjectId.createPk() })
      .then(u => {
        should.not.exist(u)
        done()
      })
      .catch(done)
  })

  it('should not find users with a wrong ObjectId', done => {
    User.find({ _id: ObjectId.createPk() })
      .then(users => {
        users.should.eql([])
        done()
      })
      .catch(done)
  })

  it('should find one user', done => {
    User.findOne({ _id: user._id })
      .then(u => {
        u.firstname.should.eql(userContent.firstname)
        u.lastname.should.eql(userContent.lastname)
        u.address.city.should.eql(userContent.address.city)
        u.address.street.should.eql(userContent.address.street)
        done()
      })
  })

  it('should find one user - with a string instead of a ObjectId => it works !', done => {
    User.findOne({ _id: user._id.toString() })
      .then(u => {
        u.firstname.should.eql(userContent.firstname)
        u.lastname.should.eql(userContent.lastname)
        done()
      })
      .catch(done)
  })

  it('should find a user by id', done => {
    User.findById(user._id.toString())
      .then(u => {
        u.firstname.should.eql(userContent.firstname)
        u.lastname.should.eql(userContent.lastname)
        done()
      })
      .catch(done)
  })

  it('should save', done => {
    const user = new User(userContent)
    user.save()
      .then(u => {
        should.exist(u)
        done()
      })
      .catch(done)
  })

  it('should save a user with a specific _id', done => {
    userContent._id = ObjectId.createPk()
    const user = new User(userContent)
    user.save()
      .then(u => {
        u._id.should.eql(userContent._id)
        done()
      })
      .catch(done)
  })

  it('should update', done => {
    User.update({ _id: user._id },
                { firstname: 'newFirstname' })
      .then(r => {
        r.ok.should.eql(1)
        r.n.should.eql(1)
        done()
      })
  })

  it('should update a field and push a new value in pets array', done => {
    User.update(
      { _id: user._id },
      { firstname: 'AAA', $push: { pets: 'dog' } }
    )
    .then(r => {
      return User.findOne({ _id: user._id })
    })
    .then(u => {
      u.firstname.should.eql('AAA')
      u.pets.should.eql(['dog'])
      done()
    })
    .catch(done)
  })

  it('should return user count', done => {
    User.count({})
      .then(c => {
        c.should.eql(1)
        done()
      })
      .catch(done)
  })

  it('stream', done => {
    const stream = User.find().stream()
    let count = 0
    stream.on('data', () => {
      count++
    })

    stream.on('error', err => {
      should.not.exist(err)
    })

    stream.on('close', () => {
      count.should.eql(1)
      done()
    })
  })

  it('should remove the user', done => {
    user.remove()
      .then(r => {
        r.firstname.should.eql(user.firstname)
        r.lastname.should.eql(user.lastname)
        r._id.should.eql(user._id)
        done()
      })
  })

})
