'use strict';

const Sequelize = require('sequelize');
const db = require('./db');
const bcrypt = require('bcrypt');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

User.addHook('beforeSave', (user) => {
  user.password = bcrypt.hashSync(user.password, 14);
})

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}
module.exports = User;
