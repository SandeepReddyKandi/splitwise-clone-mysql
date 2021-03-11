const { uuid } = require('uuidv4');
const { currencyEnums } = require('../utils/enums');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    currency: {
      defaultValue: currencyEnums.USD,
      type: DataTypes.ENUM(...Object.values(currencyEnums)),
    },
    language: {
      defaultValue: 'English',
      type: DataTypes.STRING,
    },
    timezone: {
      defaultValue: '(GMT +5:30) Indian Standard Time',
      type: DataTypes.STRING,
    },
    imageURL: DataTypes.STRING,
  });

  User.beforeCreate((user) => user.id = uuid());
  return User;
};
