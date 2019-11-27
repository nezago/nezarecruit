import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DATABASE_URL,
  NODE_ENV,
} = process.env;

let pool;
const connect = () => {
  if (NODE_ENV === 'dev') {
    pool = new Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
    pool.on('connect', () => { console.log('connected to local db'); });
    return pool;
  } if (NODE_ENV === 'production') {
    pool = new Client(
      {
        connectionString: DATABASE_URL,
        ssl: true,
      },
    );
    pool.connect();
    pool.on('connect', () => { console.log('connected to online db'); });
    return pool;
  }
  return null;
};

export default connect;
