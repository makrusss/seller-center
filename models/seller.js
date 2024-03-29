'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seller.hasOne(models.Profile)
      Seller.hasMany(models.Product)
    }
  }
  Seller.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate(instance, options) {
      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(instance.password, salt);
      instance.password = hash
      }
    },
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};