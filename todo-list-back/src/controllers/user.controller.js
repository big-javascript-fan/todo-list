// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

import { User, Todos } from '../database/models';
import { authService } from '../services';
import { decryptRSA } from '../utils';
import { errorCodes, errorMessages } from '../constants/errors';
import { userValidation } from '../validations';

export const usersController = () => {
  const signUp = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      const data = await User.create(
        {
          fullName,
          email,
          encryptedPassword: password,
        },
      );
      // TODO: send verification mail
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email : email} });

      if (!user) {
        const err = new Error(errorMessages.AUTH_FAILED);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }
      const decryptedPassword = decryptRSA(password);
      if (decryptedPassword !== decryptRSA(user.encryptedPassword)) {
        const err = new Error(errorMessages.AUTH_FAILED);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }
      // TODO: check email is verified

      // Generate an access token
      const accessToken = authService().issue({ userId: user.id });
      // Generate refresh token
      const refreshToken = await authService().generateRefreshToken({ userId: user.id });

      const userObj = user.toJSON();
      delete userObj.encryptedPassword;
      userObj.accessToken = accessToken;
      userObj.refreshToken = refreshToken.token;
      res.status(200).json({ success: true, data: userObj });
    } catch (err) {
      next(err);
    }
  };

  // TODO: update it for admin panel, or test accessToken
  const getUsers = async (req, res, next) => {
    try {
      const data = await User.findAll({
        attributes: ['fullName', 'email'],
      });
      res.status(200).json({ users: data });
    } catch (err) {
      next(err);
    }
  };

  // TODO: update it for admin panel
  const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await User.destroy({ where: { id } });

      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  };

  // TODO: update it for admin panel, or test accessToken
  const getTodos = async (req, res, next) => {
    try {
      const data = await Todos.findAll();
      res.status(200).json({ success: true,  data });
    } catch (err) {
      next(err);
    }
  };

  const addTodo = async (req, res, next) => {
    try {
      const {title} = req.body
      const todo = await Todos.create({
        title,
      })
      res.status(200).json({ success: true,  data: todo });
    } catch (err) {
      next(err);
    }
  };

  const removeTodo = async (req, res, next) => {
    try {
      const {id} = req.body;
      await Todos.destroy({ where: { id } });
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  const updateTodo = async (req, res, next) => {
    try {
      const {id, title} = req.body;
      await Todos.update(
        { title: title },
        { where: { id: id } }
      );
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  const validate = (method) => {
    switch (method) {
      case 'signup': {
        return [
          body('fullName', errorMessages.FULLNAME_REQUIRED).exists(),
          body('password').exists().withMessage(errorMessages.PASSWORD_REQUIRED).custom(userValidation().checkPassword),
          body('passwordConfirmation')
            .exists()
            .withMessage(errorMessages.PW_CONFIRMATION_REQUIRED)
            .custom((value, { req }) => {
              return userValidation().checkPasswordConfirmation(req.body.password, value);
            }),
          body('email')
            .exists()
            .withMessage(errorMessages.PERSONAL_EMAIL_REQUIRED)
            .isEmail()
            .withMessage(errorMessages.PERSONAL_EMAIL_INVALID)
        ];
      }
      case 'login': {
        return [
          body('email')
            .exists()
            .withMessage(errorMessages.EMAIL_REQUIRED)
            .isEmail()
            .withMessage(errorMessages.EMAIL_INVALID)
            .custom(userValidation().checkEmail),
          body('password').exists().withMessage(errorMessages.PASSWORD_REQUIRED).custom(userValidation().checkPassword),
        ];
      }
      default:
        return null;
    }
  };

  return { signUp, login, getUsers, deleteUser, getTodos, addTodo, removeTodo, updateTodo, validate };
};
