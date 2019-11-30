import { Router } from 'express';
import models from '../../models';
import { validateApplicationForm } from '../../middlewares/validations';

const applyRouter = new Router();

applyRouter.post('/apply-for-a-job', validateApplicationForm, models.addApplicationForm);
applyRouter.post('/check-email-from-table-application-and-table-users',
  models.checkEmailFromApplicationsAndUsers);

export default applyRouter;
