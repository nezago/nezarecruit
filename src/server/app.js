import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import appMiddlewares from './middlewares/appMiddlewares';

dotenv.config();

const app = express();
const port = process.env.PORT;

appMiddlewares(app, path, express);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
