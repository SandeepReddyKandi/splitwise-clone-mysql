const dbConfig = {
  HOST: 'localhost',
  USER: 'testuser',
  PASSWORD: 'Pass@123',
  DB: 'splitwise',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const APP_TOKEN_SECRET = 'ff7dcdc22fa7ab4d653d6783a5bfbbff9eb919961481dac61efe9d0c5dbacad6';
const port = 8000;

module.exports = {
  dbConfig,
  port,
  APP_TOKEN_SECRET,
};
