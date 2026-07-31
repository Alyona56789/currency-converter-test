'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrencyRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CurrencyRate.init({
    charCode: DataTypes.STRING,
    name: DataTypes.STRING,
    nominal: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    previous: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CurrencyRate',
  });
  return CurrencyRate;
};