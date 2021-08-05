import { User } from '../database/models';
import { decryptRSA } from '../utils';
import { errorMessages } from '../constants/errors';

export const userValidation = () => {
  const checkEmail = (value) => {
    // check email used
    return User.findOne({ where: { email: value } }).then((user) => {
      if (user) {
        return Promise.reject(new Error(errorMessages.EMAIL_IN_USE));
      }
      return Promise.resolve(true);
    });
  };

  const checkPassword = (value) => {    
    const decryptedPW = decryptRSA(value);
    const regEx = new RegExp('^(?=.*[\\d])(?=.*[A-Z])[\\w!@#$%^&*-]{8,}$');
    // check password validation
    if (!regEx.test(decryptedPW)) {
      throw new Error(errorMessages.INVALID_PASSWORD);
    }
    return true;
  };

  const checkPasswordConfirmation = (pw, pwConfirmation) => {
    const decryptedPWConfirmation = decryptRSA(pw);
    const decryptedPW = decryptRSA(pwConfirmation);
    // check password confirmation
    if (decryptedPW !== decryptedPWConfirmation) {
      throw new Error(errorMessages.PW_CONFIRMATION_NOT_MATCH);
    }
    return true;
  };

  return { checkEmail, checkPassword, checkPasswordConfirmation };
};
