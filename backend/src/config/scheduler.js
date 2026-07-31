const schedule = require('node-schedule');
const CbrService = require('../services/cbrService');
const { sequelize } = require('./database'); 
const DataTypes = require('sequelize').DataTypes;

const CurrencyRate = require('../../models/currencyrate')(sequelize, DataTypes);

const job = schedule.scheduleJob('*/5 * * * *', async () => {
  console.log('[Scheduler] Начинаю обновление курсов ЦБ РФ...');
  
  try {
    const rates = await CbrService.fetchRates();
    
    let updatedCount = 0;
    for (const rate of rates) {
  await CurrencyRate.upsert({
    code: rate.code,
    name: rate.name,
    nominal: rate.nominal,
    value: rate.value,
    previous_value: rate.previous_value,
    date: rate.date
  }, {
    conflictFields: ['code', 'date']
  });
  updatedCount++;
}
    
    console.log(`[Scheduler] Обновлено ${updatedCount} валют`);
  } catch (err) {
    console.error('[Scheduler]  Ошибка обновления:', err.message);
  }
});

module.exports = job;