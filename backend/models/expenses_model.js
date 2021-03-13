const { uuid } = require('uuidv4');
const { currencyEnums } = require('../utils/enums');

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('expenses', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    byUser: {
      required: true,
      type: DataTypes.UUID,
    },
    toUser: {
      required: true,
      type: DataTypes.UUID,
    },
    groupId: {
      type: DataTypes.UUID,
      required: true,
    },
    amount: {
      required: true,
      type: DataTypes.FLOAT,
    },
    description: DataTypes.STRING,
    settledAt: {
      type: DataTypes.DATE,
    },
    currency: {
      defaultValue: currencyEnums.USD,
      type: DataTypes.ENUM(...Object.values(currencyEnums)),
    },
  });
  Expense.beforeCreate((expense) => expense.id = uuid());
  return Expense;
};
