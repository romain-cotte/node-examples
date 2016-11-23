'use strict'

const should = require('should')
const Sequelize = require('sequelize')

describe.skip('Sequelize', () => {
  let Person, person
  let sequelize, transaction
  before(() => {
    sequelize = new Sequelize('postgres://postgres:@localhost:5432/postgres')
    Person = require('../models/person')(sequelize)
    // let originalQueryFunction = Sequelize.prototype.query;
    // Sequelize.prototype.query = function (sql, options) {
    //   options = options || {};
    //   if (!options.transaction) {
    //     options.transaction = transaction;
    //   }
    //   return originalQueryFunction.call(this, sql, options);
    // }
    return sequelize.sync()
  })

  beforeEach('set transaction', () => {
    return sequelize.transaction()
      .then(_transaction => transaction = _transaction)
  });

  it('create', () => {
    let personContent = {
      firstname: 'firstname',
      lastname: 'lastname',
      age: 25,
      // location: [1, 2] // not working
      // location: { x: 1, y: 2 } // not working
      // location: { lat: 1, lng: 2 } // not working
      // location: 'POINT(-71.064544 42.28787)' // not working
    }
    return Person.create(personContent)
      .then(_person => {
        person = _person
      })
  })

  it('update', () => {
    console.log('person.get id', person.get('id'))

    return Person.update(
      { firstname: 'NewFirstname' },
      { where: { id: person.get('id') } }
    )
      .then(res => {
        res[0].should.eql(1)
        return Person.findOne({ where: { id: person.get('id') } })
      })
      .then(_person => {
        _person.get('firstname').should.eql('NewFirstname')
      })
  })

})
