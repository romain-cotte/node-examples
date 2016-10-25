'use strict'

const should = require('should')
const Sequelize = require('sequelize')

describe.skip('Sequelize', () => {
  let Person
  let sequelize, transaction
  before(() => {
    sequelize = new Sequelize('postgres://postgres:@localhost:5432/postgres')
    sequelize.sync()
    let originalQueryFunction = Sequelize.prototype.query;
    Sequelize.prototype.query = function (sql, options) {
      options = options || {};
      if (!options.transaction) {
        options.transaction = transaction;
      }
      return originalQueryFunction.call(this, sql, options);
    }
    Person = require('../models/person')(sequelize)
  })

  beforeEach('set transaction', () => {
    return sequelize.transaction()
      .then(_transaction => transaction = _transaction)
  });

  it('create', done => {
    let person = {
      firstname: 'firstname',
      lastname: 'lastname',
      age: 25,
      // location: [1, 2] // not working
      // location: { x: 1, y: 2 } // not working
      // location: { lat: 1, lng: 2 } // not working
      // location: 'POINT(-71.064544 42.28787)' // not working
    }
    Person.create(person)
      .then(p => {
        done()
      })
  })

})
