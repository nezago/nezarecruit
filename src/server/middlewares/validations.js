import { validateEmail, validatePassword } from '../../helpers/functions/validations';

export const validateSignup = (req, res, next) => {
  const {
    fname,
    dateofbirth,
    email,
    password,
  } = req.body;

  if (fname.length < 2) {
    res.status(400).send('Your familly name must have at least two characters!');
  } else if (dateofbirth.length === 0) {
    res.status(400).send('Please enter your date of birth!');
  } else if (!validateEmail(email)) {
    res.status(400).send('The email you are saving is invalid!');
  } else if (!validatePassword(password, email)[1]) {
    res.status(400).send(validatePassword(password, email)[0]);
  } else {
    next();
  }
};
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email) {
    if (validateEmail(email)) {
      if (password) {
        next();
      } else {
        res.status(400).send('Enter your password!');
      }
    } else {
      res.status(400).send('The email you are trying to use, is invalid!');
    }
  } else {
    res.status(400).send('Enter your Email please!');
  }
};
