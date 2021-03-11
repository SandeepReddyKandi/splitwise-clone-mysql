const db = require('../models/index');

const { users } = db;
const { Op } = db.Sequelize;

async function createNewUser(data) {
  const { name, email, phone, password } = data;
  const user = { name, email, phone, password };
  const result = await users.create(user);
  return result;
}

async function getUserById(userId) {
  const user = await users.findOne({ where: { id: userId } });
  return user;
}

async function findUserByEmail(email) {
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  const result = await users.findOne({ where: condition });
  return result;
}

async function updateUserDetails(userId, data) {
  const { currency, phone, name, password } = data;
  const result = await users.update(
    {
      currency, phone, name, password,
    },
    {
      id: userId,
    },
  );
  return result;
}

async function getUserByAppAccessToken(token) {
  const user = await users.findOne({ where: token });
  return user;
}

async function unsetUserAppAccessToken(userId) {
  const user = await users.update({ token: '' }, { id: userId });
  return user;
}

async function addUserAppAccessToken(userId, token) {
  const values = { token };
  const condition = { where: { id: userId } };
  const user = await users.update(values, condition);
  return user;
}

module.exports = {
  getUserById,
  createNewUser,
  findUserByEmail,
  updateUserDetails,
  getUserByAppAccessToken,
  unsetUserAppAccessToken,
  addUserAppAccessToken,
};
