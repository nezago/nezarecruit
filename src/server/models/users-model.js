import jwt from 'jsonwebtoken';
import connect from './db/settings/connectToDb';
import { hashPassword, checkPassword } from '../helper-functions/passwordEncryption';
import {
  ADD_NEW_USER,
  CHECK_EMAIL_FROM_TABLE_USERS,
  GET_USER_BY_EMAIL,
} from './db/settings/SQLqueries';
import { validateEmail } from '../../helpers/functions/validations';

export const addNewUserToDb = (req, res, next) => {
  const {
    fname,
    midname,
    lname,
    dateofbirth,
    email,
    password,
    userauthorities,
  } = req.body;
  connect().query(ADD_NEW_USER,
    [fname, midname, lname, new Date(dateofbirth), email, hashPassword(password), userauthorities],
    (err, results) => {
      if (err) {
        res.status(500).send(`Unexpected circumstance : ${err}`);
        process.exit(0);
      }
      if (results.rowCount === 1) {
        const userInfoToSend = {
          fname,
          midname,
          lname,
          dateofbirth,
          email,
          user_authorities: userauthorities,
        };
        const token = jwt.sign(userInfoToSend, 'mugirase', { expiresIn: '90 days' });
        res.status(201).json({ login: true, token });
        next();
      }
    });
};

export const checkIfEmailExistFromTableUsers = (req, res, next) => {
  const { email } = req.body;
  if (email) {
    if (validateEmail(email)) {
      connect().query(CHECK_EMAIL_FROM_TABLE_USERS, [email], (err, results) => {
        if (err) {
          res.status(500).send('Something unexpected occured, couldn\'t check the existance of the email!');
        }
        res.status(200).json(results.rows[0].exists);
        next();
      });
    }
  }
};

export const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email) {
    connect().query(GET_USER_BY_EMAIL, [email], (err, results) => {
      if (err) {
        res.status(500).send('Something wrong occured during your login, please refresh the page, and refill the form!');
      }
      const foundUser = results.rows[0];
      if (foundUser) {
        const foundUserPassword = foundUser.password;
        if (checkPassword(password, foundUserPassword)) {
          const userInfoToSend = {
            user_id: foundUser.user_id,
            fname: foundUser.fname,
            midname: foundUser.middle_name,
            lname: foundUser.lname,
            date_of_birth: foundUser.date_of_birth,
            email: foundUser.email,
            user_registered_at: foundUser.user_registered_at,
            user_edited_at: foundUser.user_edited_at,
            user_authorities: foundUser.user_authorities,
          };
          const token = jwt.sign(userInfoToSend, 'mugirase', { expiresIn: '90 days' });
          res.status(200).json({ login: true, token });
          next();
        } else {
          res.status(401).send('Your password is wrong!');
        }
      } else {
        res.status(404).send(`The email ${email} doesn't exist on NezaDo`);
      }
    });
  }
};
