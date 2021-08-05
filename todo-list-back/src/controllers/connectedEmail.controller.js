import { body, query, validationResult } from 'express-validator';

import { connectedEmailService, authService, userService } from '../services';
import { connectedEmailValidation } from '../validations';
import { User, ConnectedEmail } from '../database/models';
import { errorCodes, errorMessages } from '../constants/errors';

export const connectedEmailController = () => {
  const checkUsed = async (req, res, next) => {
    try {
      // throw an error when validation failed. check email used in this validation
      validationResult(req).throw();

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  const validate = (method) => {
    switch (method) {
      case 'check-used': {
        return [
          query('email')
            .exists()
            .withMessage(errorMessages.EMAIL_REQUIRED)
            .isEmail()
            .withMessage(errorMessages.EMAIL_INVALID)
            .custom(connectedEmailValidation().checkEmail),
        ];
      }
      default:
        return null;
    }
  };

  return { checkUsed, validate };
};
