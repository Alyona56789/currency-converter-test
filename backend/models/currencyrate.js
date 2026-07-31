'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CurrencyRate extends Model {}

  CurrencyRate.init({
    code: { type: DataTypes.STRING(10), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    nominal: { type: DataTypes.INTEGER, allowNull: false },
    value: { type: DataTypes.DECIMAL(18, 6), allowNull: false },
    previous_value: { type: DataTypes.DECIMAL(18, 6), allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    sequelize,
    modelName: 'CurrencyRate',
    tableName: 'currency_rates',
    timestamps: true,
    underscored: true
  });

  return CurrencyRate;
};