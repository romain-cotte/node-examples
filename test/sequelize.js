if (process.env.NODE_ENV === 'production') {
  throw new Error('You cannot run test on production environment');
}

const Sequelize = require('sequelize');
const should = require('should'); // eslint-disable-line

const CONFIG = require('../config');

describe('Sequelize', () => {
  let Person, person;
  let sequelize;
  // let transaction;
  before(() => {
    sequelize = new Sequelize(CONFIG.POSTGRES_URL);
    Person = require('../models/person')(sequelize);
    // let originalQueryFunction = Sequelize.prototype.query;
    // Sequelize.prototype.query = function (sql, options) {
    //   options = options || {};
    //   if (!options.transaction) {
    //     options.transaction = transaction;
    //   }
    //   return originalQueryFunction.call(this, sql, options);
    // }

    // This will not add new columns in the database! However, new indexes
    // will be created during the synchronization.
    return sequelize.sync();
  });

  beforeEach('set transaction', () => {
    return sequelize.transaction();
      // .then(_transaction => transaction = _transaction);
  });

  after('remove all persons', () => {
    return Person.destroy({
      where: {
        tags: { $contains: ['unit_test'] }
      }
    });
  });

  it('create', () => {
    let personContent = {
      firstname: 'firstname',
      lastname: 'lastname',
      age: 25,
      tags: ['unit_test']
      // location: [1, 2] // not working
      // location: { x: 1, y: 2 } // not working
      // location: { lat: 1, lng: 2 } // not working
      // location: 'POINT(-71.064544 42.28787)' // not working
    };
    return Person.create(personContent)
      .then(_person => {
        person = _person;
      });
  });

  it('bulkCreate', () => {
    let persons = [];
    for (let i = 0; i < 10; i++) {
      persons.push({
        firstname: 'Firstname' + i.toString(),
        lastname: 'Lastname ' + i.toString(),
        age: i + 5,
        tags: ['unit_test']
      });
    }
    return Person.bulkCreate(persons)
      .then(res => {
        res.length.should.eql(10);
      });
  });

  it('update', () => {
    return Person.update(
      { firstname: 'NewFirstname' },
      { where: { id: person.get('id') } }
    )
      .then(res => {
        res[0].should.eql(1);
        return Person.findOne({ where: { id: person.get('id') } });
      })
      .then(_person => {
        _person.get('firstname').should.eql('NewFirstname');
      });
  });

  it('findOne with order', () => {
    return Person.findOne({
      order: [
        ['firstname', 'DESC']
      ]
    })
    .then(_person => {
      _person.get('lastname').should.eql('lastname');
      return Person.findOne({
        order: [
          ['firstname', 'ASC']
        ]
      });
    })
    .then(_person => {
      _person.get('lastname').should.eql('Lastname 0');
    });
  });

});
