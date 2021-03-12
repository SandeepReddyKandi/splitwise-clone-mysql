const _ = require('underscore');
const config = require('../config/config');
const authenticationUtil = require('../utils/authentication');
const genericDtl = require('../dtl/generic');
const userRepo = require('../repos/user_repo');
const logger = require('../utils/logger').getLogger();

async function isLoggedIn(req, res, next) {
  try {
    let tokenData;
    const bearerToken = req.headers.authorization;
    logger.debug('isLoggedIn User Check called with bearerToken', bearerToken);

    if (!bearerToken || !bearerToken.length) {
      logger.error('isLoggedIn User Check did not get authorization header', req.headers.authorization);
      const response = genericDtl.getResponseDto({}, 'Unauthorized User!');
      return res.status(401).send(response);
    }

    try {
      tokenData = await authenticationUtil.verifyJwtToken(config.APP_TOKEN_SECRET, bearerToken);
    } catch (err) {
      logger.error(`Error while trying to verify token. Err: ${err}`);

      const appAccessToken = bearerToken.split(' ')[1];
      const user = await userRepo.getUserByAppAccessToken(appAccessToken);
      if (!_.isEmpty(user)) {
        await userRepo.unsetUserAppAccessToken(user.Id);
      }

      const response = genericDtl.getResponseDto({}, 'Unauthorized User!');
      return res.status(401).send(response);
    }

    const { decodedToken } = tokenData;
    const { userId } = decodedToken;
    const decodedUser = await userRepo.getUserById(userId);
    if (!decodedUser || _.isEmpty(decodedUser)) {
      const response = genericDtl.getResponseDto({}, 'Invalid token!');
      return res.status(401).send(response);
    }
    req.user = { userId: decodedUser.id, email: decodedUser.email };
    return next();
  } catch (err) {
    logger.error(`Error while verifing user auth. Err: ${err}`);
    return next(err);
  }
}

module.exports = {
  isLoggedIn,
};
