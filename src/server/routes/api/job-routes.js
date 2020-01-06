import { Router } from 'express';
import { validateJob } from '../../middlewares/validations';
import models from '../../models';
import { authenticate } from '../../middlewares/auth';

const jobRouter = new Router();

jobRouter.post('/add-new-application-form-url', authenticate, models.addNewApplicationFormUrl);
jobRouter.get('/get-all-application-form-urls', authenticate, models.getAllApplicationFormUrls);
jobRouter.post('/check-if-application-url-is-registered', models.checkIfApplicationFormUrlIsRegistered);
jobRouter.post('/add-or-edit-job', authenticate, validateJob, models.addOrEditJob);
jobRouter.get('/get-all-jobs', models.getAllJobs);
jobRouter.get('/jobs/:job_id', models.getParticularJob);

export default jobRouter;
