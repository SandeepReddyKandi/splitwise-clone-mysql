const dbConfig = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'root@123',
  DB: 'splitwise',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const port = 8000;

module.exports = {
  dbConfig,
  port,
};
