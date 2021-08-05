import { User } from '../database/models';
import { errorMessages } from '../constants/errors';

export const connectedEmailValidation = () => {
  const checkEmail = (value, connectedEmailId = null) => {
    
    return User.findOne({ where: { email: value }, paranoid: false }).then((connectedEmail) => {
      if (!connectedEmail)
        return Promise.resolve(true);
      if (connectedEmail.deletedAt == null) {
        if (connectedEmail.id !== connectedEmailId) {
          return Promise.reject(new Error(errorMessages.PERSONAL_EMAIL_EXIST));
        }
        return Promise.resolve(true);
      }
    });
  };

  return { checkEmail };
};
