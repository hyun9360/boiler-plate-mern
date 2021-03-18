'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static generatePassword(password) {
      return bcrypt.hash(password, bcrypt.genSaltSync(saltRounds));
    }

    static comparePassword(plainPassword, password, cb) {
      bcrypt.compare(plainPassword, password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
      })
      return cb
    }

    static generateToken(id) {
      return jwt.sign(id, 'secret')
    }

    static associate(models) {
      // define association here
    }
  };

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastname: DataTypes.STRING,
    token: DataTypes.STRING,
    tokenExp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

