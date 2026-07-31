'use strict';

module.exports = {
  async up(queryInterface) {
    try {
      await queryInterface.removeIndex('currency_rates', 'unique_currency_date');
    } catch (e) {
    }    await queryInterface.addIndex('currency_rates', ['code', 'date'], {
      unique: true,
      name: 'unique_code_date'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('currency_rates', 'unique_code_date');
  }
};
