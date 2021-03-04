const db = require('../models/index');

const { users } = db;
const { Op } = db.Sequelize;

async function createNewUser(data) {
  const { name, email, phone, password } = data;
  const user = { name, email, phone, password };
  const result = await users.create(user);
  return result;
}

async function findUserByEmail(email) {
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  const result = await users.findOne({ where: condition });
  return result;
}

module.exports = {
  createNewUser,
  findUserByEmail,
};
