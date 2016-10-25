'use strict'

const Sequelize = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('Person', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: 1
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    age: Sequelize.INTEGER,
    // location: 'Point'
    // location: Sequelize.GEOMETRY('POINT')
  }, {
    tableName: 'persons'
  });
};
