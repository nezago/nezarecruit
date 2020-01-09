import Router from 'express';
import path from 'path';
import { authenticate } from '../middlewares/auth';
import tableCreation from '../middlewares/tableRefreshProdMode';

const myUrls = Router();

myUrls.get('/', (req, res, next) => {
  const indexPage = path.join(__dirname, '../../ui/views/index.pug');
  res.render(indexPage);
  next();
});

myUrls.get('/enter-nezago', (req, res, next) => {
  const loginPage = path.join(__dirname, '../../ui/views/login.pug');
  res.render(loginPage);
  next();
});

myUrls.get('/auth/auth-user', authenticate, (req, res, next) => {
  const userPage = path.join(__dirname, '../../ui/views/user.pug');
  res.render(userPage, { fname: req.authenticatedUser.fname });
  next();
});

myUrls.get('/refresh-tables', tableCreation, (req, res, next) => {
  res.send('waiting...');
  next();
});

export default myUrls;
