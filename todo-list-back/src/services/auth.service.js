/* eslint-disable implicit-arrow-linebreak */
import jwt from 'jsonwebtoken';
import moment from 'moment';

import { RefreshToken } from '../database/models';

import { jwtEncryption, jwtExpiration, refreshEncryption, refreshExpiration } from '../constants/settings';

export const authService = () => {
  const issue = (userId) =>
    jwt.sign({ userId }, jwtEncryption, { algorithm: 'HS256', expiresIn: parseInt(jwtExpiration, 10) });

  const verify = (token, cb) => jwt.verify(token, jwtEncryption, { algorithm: ['HS256'] }, cb);

  const generateRefreshToken = async (payload) => {
    // remove previous refreshToken
    const { userId } = payload;
    const previousToken = await RefreshToken.findOne({ where: { userId } });
    if (previousToken) {
      previousToken.destroy();
    }

    const token = jwt.sign(payload, refreshEncryption, {
      algorithm: 'HS256',
      expiresIn: parseInt(refreshExpiration, 10),
    });

    const expiresAt = moment().add(refreshExpiration, 'seconds').toDate();
    const tokenObject = {
      userId,
      token,
      expiresAt,
    };

    return RefreshToken.create(tokenObject);
  };

  const issueFromRefreshToken = async (refreshToken, cb) => {
    const { userId } = jwt.verify(refreshToken, refreshEncryption, { algorithm: ['HS256'] }, cb);
    const tokenObject = await RefreshToken.findOne({ where: { userId } });
    if (tokenObject) {
      const newToken = issue({ userId });
      // renew refresh token
      generateRefreshToken({ userId });
      return newToken;
    }
    throw new Error('Incorrect refreshToken');
  };

  return { issue, issueFromRefreshToken, verify, generateRefreshToken };
};
