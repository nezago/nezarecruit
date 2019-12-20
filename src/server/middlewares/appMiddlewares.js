/**
 * THIS FILE IS TO SUMMARIZE ALL OF MIDDLEWARES IN ONE MODULE AND THEN
 * USE THEM IN app.js MODULE
 *
 */
import routes from '../routes';

const appMiddlewares = (app, path, express) => {
  app.set('view engine', 'pug');
  app.use('/js', express.static(path.join(__dirname, '../../ui/js/production/build/')));
  app.use('/img', express.static(path.join(__dirname, '../../ui/images/')));

  app.use(express.json());
  app.use('/', routes.myUrls);
  app.use('/users', routes.userRouter);
  app.use('/applications', routes.applyRouter);
  app.use('/manage-homepage', routes.manageHomepageRouter);
};

export default appMiddlewares;
