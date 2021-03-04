const logger = require('../utils/logger').getLogger();
const _ = require('underscore');
const bcrypt = require('bcrypt');
const genericDTL = require('../dtl/generic');
const userRepo = require('../repos/user_repo');

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
      return res.send(genericDTL.getResponseDto({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));
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

    return res.send(genericDTL.getResponseDto({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    }));
  } catch (err) {
    logger.error(`Unable to sign up user. Err ${err}`);
    return next(err);
  }
}

module.exports = {
  loginUser,
  signUpUser,
};
