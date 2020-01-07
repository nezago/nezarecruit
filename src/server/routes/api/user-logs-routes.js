import { Router } from 'express';
import models from '../../models';
import { authenticate } from '../../middlewares/auth';
import { validateUserLog } from '../../middlewares/validations';

const userLogRouter = new Router();

userLogRouter.post('/add-new-user-log', validateUserLog, authenticate, models.addNewUserLog);
userLogRouter.get('/get-all-users-logs', authenticate, models.getAllUsersLogs);
userLogRouter.post('/get-particular-log-by-user-id', authenticate, models.getUserLogByUserId);
userLogRouter.post('/get-particular-log-by-log-id', authenticate, models.getUserLogByLogId);
userLogRouter.post('/get-particular-log-by-dates', authenticate, models.getUserLogByDates);
userLogRouter.post('/get-particular-log-by-user-id-and-dates', authenticate, models.getUserLogByDatesAndUserId);

export default userLogRouter;
