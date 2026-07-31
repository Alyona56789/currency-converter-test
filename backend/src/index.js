require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Соединение с БД установлено успешно.');

    require('./config/scheduler');

    app.listen(PORT, () => {
      console.log(`Бэкенд запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка запуска сервера:', error.message);
    process.exit(1);
  }
}

startServer();