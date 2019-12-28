import dotenv from 'dotenv';
import connect from '../settings/connectToDb';
import { hashPassword } from '../../../helper-functions/passwordEncryption';
import {
  CREATE_TABLE_USERS,
  ADD_DEFAULT_USER,
  CREATE_TABLE_APPLY_FOR_SOFTWARE_DEV_JUNIOR,
  CREATE_TABLE_INITIAL_EMAIL_FOR_APPLICATION_STATUS,
  CREATE_TABLE_ALL_SENT_EMAILS,
  CREATE_TABLE_MANAGE_HOMEPAGE,
  CREATE_TABLE_JOB_LIST,
} from '../settings/SQLqueries';

dotenv.config();

const migrateTables = async (isDone) => {
  console.log('creating table users... ');
  await connect().query(CREATE_TABLE_USERS);

  console.log('hashing descholar\'s default passkey...');
  const hashedPass = await hashPassword('mugirase');

  console.log('inserting descholar as default user...');
  await connect().query(ADD_DEFAULT_USER(hashedPass));

  console.log('creating table applications for software dev juniors... ');
  await connect().query(CREATE_TABLE_APPLY_FOR_SOFTWARE_DEV_JUNIOR);

  console.log('creating table initial email status ...');
  await connect().query(CREATE_TABLE_INITIAL_EMAIL_FOR_APPLICATION_STATUS);

  console.log('creating table all sent emails ...');
  await connect().query(CREATE_TABLE_ALL_SENT_EMAILS);

  console.log('creating table manage homepage ...');
  await connect().query(CREATE_TABLE_MANAGE_HOMEPAGE);

  console.log('creating table job_list ...');
  await connect().query(CREATE_TABLE_JOB_LIST);

  if (isDone) { isDone(); }
  process.exit(0);
};

export default migrateTables;
