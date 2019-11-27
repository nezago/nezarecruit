import { Router } from 'express';
import { validateSignup, validateLogin } from '../middlewares/validations';
import models from '../models';

const userRouter = new Router();

userRouter.post('/check-existance-of-email', models.checkIfEmailExistFromTableUsers);
userRouter.post('/register-new-user', validateSignup, models.addNewUserToDb);
userRouter.post('/login', validateLogin, models.userLogin);

export default userRouter;
