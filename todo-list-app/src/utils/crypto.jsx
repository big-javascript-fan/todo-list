import crypto from 'crypto';

import config from '../constants/config';

export default class Crypto {
	static encrypt(data) {
		const encryptedData = crypto.publicEncrypt(config.RSA_PUBLIC_KEY, Buffer.from(data, 'utf8'));
		return encryptedData.toString('base64');
	}

	static decrypt(encryptedData) {
		try {
			const decryptedData = crypto.privateDecrypt(config.RSA_PRIVATE_KEY, Buffer.from(encryptedData, 'base64'));
			return decryptedData.toString('utf8');
		} catch (err) {
			throw new Error('Invalid encrypted hash');
		}
	}
}
