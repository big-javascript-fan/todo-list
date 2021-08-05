import dotenv from 'dotenv';

dotenv.config();

export const jwtEncryption = process.env.JWT_ENCRYPTION;
export const jwtExpiration = process.env.JWT_EXPIRATION;

export const refreshEncryption = process.env.REFRESH_ENCRYPTION;
export const refreshExpiration = process.env.REFRESH_EXPIRATION;

export const rsaPrivateKey = process.env.RSA_PRIVATE_KEY;
export const rsaPublicKey = process.env.RSA_PUBLIC_KEY;
