import { Router } from 'express';
import models from '../../models';
import { validateApplicationForm } from '../../middlewares/validations';
import { authenticate } from '../../middlewares/auth';

const applyRouter = new Router();

applyRouter.post('/apply-for-a-job', validateApplicationForm, models.addApplicationForm);
applyRouter.post('/check-email-from-table-application-and-table-users',
  models.checkEmailFromApplicationsAndUsers);
applyRouter.get('/get-all-applications', authenticate, models.getAllApplications);

export default applyRouter;
