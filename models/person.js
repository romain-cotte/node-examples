/**
 * Declaration of the schema
 * Sequelize.STRING corresponds to character varying(255)
 *
 */
const Sequelize = require('sequelize');

module.exports = sequelize => {
  return sequelize.define('Person', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      // defaultValue: 1
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    age: Sequelize.INTEGER,
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING(64)),
    }
    // location: 'Point'
    // location: Sequelize.GEOMETRY('POINT')
  }, {
    tableName: 'persons',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { unique: false, fields: [ 'age' ] },
      { unique: false, fields: [ 'firstname' ] }
    ]
  });
};
