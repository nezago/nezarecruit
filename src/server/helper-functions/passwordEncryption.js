import bcrypt from 'bcrypt';

export const hashPassword = (passkey) => {
  const saltRounds = bcrypt.genSaltSync(14);
  return bcrypt.hashSync(passkey, saltRounds);
};

export const checkPassword = (currPass, hashedPass) => bcrypt.compareSync(currPass, hashedPass);
