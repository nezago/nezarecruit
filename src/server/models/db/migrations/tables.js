import dotenv from 'dotenv';
import connect from '../settings/connectToDb';
import { hashPassword } from '../../../helper-functions/passwordEncryption';
import {
  CREATE_TABLE_USERS,
  ADD_DEFAULT_USER,
  CREATE_TABLE_APPLICATIONS,
  CREATE_TABLE_INITIAL_EMAIL_FOR_APPLICATION_STATUS,
} from '../settings/SQLqueries';

dotenv.config();

const migrateTables = async (isDone) => {
  console.log('creating table users... ');
  await connect().query(CREATE_TABLE_USERS);

  console.log('hashing descholar\'s default passkey...');
  const hashedPass = await hashPassword('mugirase');

  console.log('inserting descholar as default user...');
  await connect().query(ADD_DEFAULT_USER(hashedPass));

  console.log('creating table applications... ');
  await connect().query(CREATE_TABLE_APPLICATIONS);

  console.log('creating table initial email status ...');
  await connect().query(CREATE_TABLE_INITIAL_EMAIL_FOR_APPLICATION_STATUS);

  if (isDone) { isDone(); }
  process.exit(0);
};

export default migrateTables;
