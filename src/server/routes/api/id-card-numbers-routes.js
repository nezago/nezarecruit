import { Router } from 'express';
import models from '../../models';
import { authenticate } from '../../middlewares/auth';
import { validateUserIdCardNumber } from '../../middlewares/validations';

const idCardNumberRouter = new Router();

idCardNumberRouter.post('/add-new-id-card-number',
  validateUserIdCardNumber, authenticate, models.addNewIdCardNumber);

idCardNumberRouter.get('/get-all-id-card-numbers',
  authenticate, models.getAllIdCardNumbers);

idCardNumberRouter.post('/get-particular-id-card-number',
  models.getParticularIdCardNumberByIdCardNumber);

idCardNumberRouter.post('/check-if-id-card-number-exists',
  models.checkIfIdCardNumberExists);

export default idCardNumberRouter;
