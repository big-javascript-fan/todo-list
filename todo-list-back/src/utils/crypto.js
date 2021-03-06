import crypto from 'crypto';

import { rsaPrivateKey, rsaPublicKey } from '../constants/settings';

export const decryptRSA = (encryptedData) => {
  try {
    const decryptedData = crypto.privateDecrypt(rsaPrivateKey, Buffer.from(encryptedData, 'base64'));
    console.log('decrypted data -------', decryptedData.toString('utf8'));
    return decryptedData.toString('utf8');
  } catch (err) {
    throw new Error('Invalid encrypted hash');
  }
};

export const encryptRSA = (data) => {
  const encryptedData = crypto.publicEncrypt(rsaPublicKey, Buffer.from(data, 'utf8'));

  return encryptedData.toString('base64');
};
