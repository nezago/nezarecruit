import { Router } from 'express';
import { validateJob } from '../../middlewares/validations';
import models from '../../models';
import { authenticate } from '../../middlewares/auth';

const jobRouter = new Router();

jobRouter.post('/add-new-job', authenticate, validateJob, models.addNewJob);
jobRouter.get('/get-all-jobs', models.getAllJobs);

export default jobRouter;
