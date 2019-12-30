import dotenv from 'dotenv';
import migrateTables from '../models/db/migrations/tables';

dotenv.config();

const { NODE_ENV } = process.env;
const tableCreation = (req, res, next) => {
  if (NODE_ENV === 'production') {
    (async () => {
      await migrateTables();
    })();
    next();
  }
};

export default tableCreation;
