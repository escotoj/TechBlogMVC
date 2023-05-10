const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'techblog',
    'root',
    'password',
    {
      host: 'localhost',
      dialect: 'mysql',
    }
  );
  
  
  module.exports = sequelize;