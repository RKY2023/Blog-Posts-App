const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Blog = sequelize.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  image: Sequelize.STRING,
  description: Sequelize.STRING
});

module.exports = Blog;