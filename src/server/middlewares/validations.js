import { validateEmail, validatePassword, validateFname } from '../../helpers/functions/validations';


/** ====================================================================================
 *
 *  USERS
 * =====================================================================================
 */
export const validateSignup = (req, res, next) => {
  const {
    fname,
    dateofbirth,
    email,
    password,
  } = req.body;

  if (!validateFname(fname)) {
    res.status(400).send('Your familly name has illegal characters!');
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


/** ================================================================================================
 *
 * APPLICATIONS
 * =================================================================================================
 */
export const validateApplicationForm = (req, res, next) => {
  const {
    fname,
    educationlevel,
    graduationyear,
    employedbefore,
    startedprogrammingyear,
    currentlyemployed,
    dateofbirth,
    email,
  } = req.body;

  if (!validateFname(fname)) {
    res.status(400).send('Your application is not accepted, because your familly name contains illegal characters!');
  } else if (educationlevel.length < 1) {
    res.status(400).send('You must precise your education level');
  } else if (graduationyear.length < 4) {
    res.status(400).send('The graduation year you chose is invalid, it must be between 1901-2020');
  } else if (employedbefore.length < 1) {
    res.status(400).send('You must precise if you have ever been employed or not');
  } else if (startedprogrammingyear.length < 4) {
    res.status(400).send('The year of your pragramming start is invalid!');
  } else if (currentlyemployed.length < 1) {
    res.status(400).send('You must precise if you are currently employed or not');
  } else if (dateofbirth.length === 0) {
    res.status(400).send('We want to know your date of birth please');
  } else if (!validateEmail(email)) {
    res.status(400).send('The email you put is invalid');
  } else {
    next();
  }
};
