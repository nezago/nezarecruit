import dotenv from 'dotenv';
import connect from '../settings/connectToDb';
import { hashPassword } from '../../../helper-functions/passwordEncryption';
import { CREATE_TABLE_USERS, ADD_DEFAULT_USER } from '../settings/SQLqueries';

dotenv.config();

const migrateTables = async (isDone) => {
  console.log('creating table users ');
  await connect().query(CREATE_TABLE_USERS);

  console.log('hashing descholar\'s default passkey');
  const hashedPass = await hashPassword('mugirase');

  console.log('inserting descholar as default user');
  await connect().query(ADD_DEFAULT_USER(hashedPass));


  if (isDone) { isDone(); }
  process.exit(0);
};

export default migrateTables;
