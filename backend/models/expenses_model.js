const { currencyEnums, expenseEnums } = require('../utils/enums');

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('expenses', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    byUser: {
      type: DataTypes.UUID,
    },
    toUser: {
      type: DataTypes.UUID,
    },
    expenseId: {
      type: DataTypes.STRING,
      unique: true,
    },
    groupId: {
      type: DataTypes.UUID,
      require: true,
    },
    amount: {
      required: true,
      type: DataTypes.FLOAT,
    },
    status: {
      required: true,
      type: DataTypes.ENUM(...Object.values(expenseEnums)),
    },
    description: DataTypes.STRING,
    currency: {
      default: currencyEnums.USD,
      type: DataTypes.ENUM(...Object.values(currencyEnums)),
    },
  });
  return Expense;
};
