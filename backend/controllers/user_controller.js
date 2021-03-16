const _ = require('underscore');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const logger = require('../utils/logger').getLogger();
const genericDTL = require('../dtl/generic');
const authenticationUtil = require('../utils/authentication');
const userRepo = require('../repos/user_repo');
const expensesRepo = require('../repos/expenses_repo');
const userDtl = require('../dtl/user_dtl');

async function createHashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function loginUser(req, res, next) {
  try {
    logger.info('controllers', 'loginUser', req.body);
    const { email, password } = req.body;
    if (!email) throw new Error('email param required');
    if (!password) throw new Error('password param required');

    const user = await userRepo.findUserByEmail(email);
    if (!user || _.isEmpty(user)) return res.send(genericDTL.getResponseDto('', 'User not found'));
    if (bcrypt.compareSync(password, user.password)) {
      const tokenData = {
        userId: user.id,
      };
      const loginToken = await authenticationUtil.generateToken(config.APP_TOKEN_SECRET, tokenData);
      await userRepo.addUserAppAccessToken(user.id, loginToken);
      const userDetails = await userRepo.getUserById(user.id);
      return res.send(genericDTL.getResponseDto(userDetails));
    }
    return res.send(genericDTL.getResponseDto('', 'Incorrect password.'));
  } catch (err) {
    logger.error(`User login failed. Err: ${err}`);
    return next(err);
  }
}

async function signUpUser(req, res, next) {
  try {
    logger.info('controllers', 'signUpUser', req.body);
    const { name, email, password, phone } = req.body;
    if (!name) throw new Error('name param required');
    if (!email) throw new Error('email param required');
    if (!phone) throw new Error('phone param required');
    if (!password) throw new Error('password param required');

    const user = await userRepo.findUserByEmail(email);
    if (user && !_.isEmpty(user)) return res.send(genericDTL.getResponseDto('', 'User already exists with this email id.'));

    const hashedPassword = await createHashedPassword(password);
    const newUser = await userRepo.createNewUser({ name, email, phone, password: hashedPassword });
    const tokenData = {
      userId: newUser.id,
    };
    const loginToken = await authenticationUtil.generateToken(config.APP_TOKEN_SECRET, tokenData);
    await userRepo.addUserAppAccessToken(newUser.id, loginToken);
    const userDetails = await userRepo.getUserById(newUser.id);
    return res.send(genericDTL.getResponseDto(userDetails));
  } catch (err) {
    logger.error(`Unable to sign up user. Err ${err}`);
    return next(err);
  }
}

async function updateUserDetails(req, res, next) {
  try {
    logger.info('controllers', 'updateUserDetails', 'body', JSON.stringify(req.body));
    const { userId } = req.user;
    const { currency, phone, name, password, language, timezone } = req.body;
    let hashedPassword;
    if (password) hashedPassword = await createHashedPassword(password);
    await userRepo.updateUserDetailsById(userId, { currency, phone, name, password: hashedPassword, language, timezone });
    const updatedDetails = await userRepo.getUserById(userId);
    const response = genericDTL.getResponseDto(updatedDetails);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to update user details. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function fetchBalance(req, res, next) {
  try {
    logger.info('controllers', 'fetchBalance');
    const { userId } = req.user;
    const balance = await expensesRepo.fetchBalanceByUserId(userId);
    const data = userDtl.getFetchBalanceDto(balance);
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Error in fetching balance. Err: ${err}`);
    return next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    logger.info('controllers', 'getAllUsers');
    const users = await userRepo.getAllUsers();
    const data = userDtl.getBasicUsersDetailDto(users);
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Error in getting all users. Err: ${err}`);
    return next(err);
  }
}

async function getUserDetailsByToken(req, res, next) {
  try {
    logger.info('controllers', 'getUserDetailsByToken');
    const { token } = req.params;
    const user = await userRepo.getUserByAppAccessToken(token);
    const response = genericDTL.getResponseDto(user);
    return res.send(response);
  } catch (err) {
    logger.error('Error in getting user from app token', JSON.stringify(err));
    return next(err);
  }
}

module.exports = {
  loginUser,
  signUpUser,
  fetchBalance,
  updateUserDetails,
  getAllUsers,
  getUserDetailsByToken,
};
