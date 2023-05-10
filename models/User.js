const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class User extends Model {
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
       allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'user',
    // timestamps: false,
  }
);

module.exports = User;