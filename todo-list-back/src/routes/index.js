import express from 'express';
import { usersController, connectedEmailController } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/users', usersController().getUsers);
indexRouter.delete('/users/:id', usersController().deleteUser);
indexRouter.get('/get-todos', usersController().getTodos);
indexRouter.post('/add-todo', usersController().addTodo);
indexRouter.post('/remove-todo', usersController().removeTodo);
indexRouter.post('/update-todo', usersController().updateTodo);
indexRouter.get(
  '/email/check-used',
  connectedEmailController().validate('check-used'),
  connectedEmailController().checkUsed
);
indexRouter.post('/signup', usersController().validate('signup'), usersController().signUp);
indexRouter.post('/login', usersController().validate('login'), usersController().login);

export default indexRouter;
