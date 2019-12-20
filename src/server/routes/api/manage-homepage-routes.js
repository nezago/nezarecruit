import { Router } from 'express';
import models from '../../models';
import { authenticate } from '../../middlewares/auth';

const manageHomepageRouter = new Router();

manageHomepageRouter.post('/add-new-manage-homepage', authenticate, models.addNewManageHomepage);
manageHomepageRouter.get('/get-all-manage-homepage', models.getAllManages);

export default manageHomepageRouter;
