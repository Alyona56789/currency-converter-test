const router = require('express').Router();
const { sequelize } = require('../config/database');
const DataTypes = require('sequelize').DataTypes;
const CurrencyRate = require('../../models/currencyrate')(sequelize, DataTypes);

router.get('/', async (req, res) => {
  try {
    const rates = await CurrencyRate.findAll({
      order: [['code', 'ASC']]
    });
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;