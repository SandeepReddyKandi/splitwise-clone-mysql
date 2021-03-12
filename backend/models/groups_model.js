const { uuid } = require('uuidv4');
const { currencyEnums } = require('../utils/enums');

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('groups', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      unique: true,
      type: DataTypes.STRING,
    },
    acceptedUsers: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('acceptedUsers').split(';');
      },
      set(val) {
        this.setDataValue('acceptedUsers', val.join(';'));
      },
    },
    invitedUsers: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('invitedUsers') ? this.getDataValue('invitedUsers').split(';') : this.getDataValue('invitedUsers');
      },
      set(val) {
        this.setDataValue('invitedUsers', val.join(';'));
      },
    },
    currency: {
      defaultValue: currencyEnums.USD,
      type: DataTypes.ENUM(...Object.values(currencyEnums)),
    },
    imageURL: DataTypes.STRING,
  });

  Group.beforeCreate((group) => group.id = uuid());

  return Group;
};
