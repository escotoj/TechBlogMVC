const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Blog extends Model {
}


Blog.init(
  {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
    type: DataTypes.STRING,
    allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'blog',
    // timestamps: false,
  }
);

module.exports = Blog;