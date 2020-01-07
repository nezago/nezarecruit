/* eslint-disable prefer-destructuring */
import {
  validateFname,
  validateEmail,
  validatePassword,
} from '../../../../../../../helpers/functions/validations';

/** DATES AND TIMES */
export const handleDateOfBirth = (dateOfBirth) => {
  if (dateOfBirth.length === 0) {
    if (dateOfBirth.includes('/')) {
      return dateOfBirth.replace('/', '-');
    }
    if (dateOfBirth.includes('.')) {
      return dateOfBirth.replace('.', '-');
    }
  }
  return 'Enter date please!';
};

/** DATES ONLY */
export const handleCurrDate = () => {
  const today = new Date();
  const currYear = today.getFullYear();
  const currMonth = today.getMonth() + 1;
  const currDate = today.getDate();

  return `${currYear}-${currMonth}-${currDate}`;
};

/** DATES AND TYM */
export const handleCurrDateTime = () => {
  const currTime = new Date();
  const hours = currTime.getHours();
  const minutes = currTime.getMinutes();
  const secs = currTime.getSeconds();
  const currDate = handleCurrDate();

  return `${currDate} ${hours}:${minutes}:${secs}`;
};

/** HANDLE FNAME TYPING */
export const handleFnameTyping = (event, component, inputFields) => {
  const fname = event.target.value;
  const { fnameError } = inputFields;
  if (validateFname(fname)) {
    fnameError.innerHTML = '';
    component.setState({ fname });
  } else {
    fnameError.innerHTML = 'Invalid family name!';
  }
};

/** HANDLE FIELD TYPING */
export const handleTyping = (event, component) => {
  component.setState({ [event.target.name]: event.target.value });
};

/** HANDLE EMAIL TYPING */
export const handleEmailTyping = (event, inputFields, checkEmail) => {
  const { emailError } = inputFields;
  const email = event.target.value;
  if (validateEmail(email)) {
    emailError.innerHTML = '';
    checkEmail({ email });
  } else {
    emailError.innerHTML = 'Invalid email';
  }
};

/** HANDLE PASSWORD TYPING */
export const handlePasswordTyping = (event, component, inputFields) => {
  const { passwordError } = inputFields;
  const password = event.target.value;
  if (validatePassword(password)[1]) {
    passwordError.innerHTML = '';
    component.setState({ password });
  } else {
    passwordError.innerHTML = validatePassword(password)[0];
  }
};

/** HANDLE CONFIRM PASSWORD TYPING */
export const handleConfirmPasswordTyping = (event, component, inputFields) => {
  const { password } = component.state;
  const confirmpassword = event.target.value;
  const { confirmpasswordError } = inputFields;
  if (password === confirmpassword) {
    confirmpasswordError.innerHTML = '';
    component.setState({ password, confirmpassword });
  } else {
    component.setState({ confirmpassword: '' });
    confirmpasswordError.innerHTML = 'Passwords missmatch';
  }
};

/** HANDLE SUBMIT THE FORM */
export const handleSubmitSignupForm = (component, inputFields, submitForm) => {
  const {
    fname, midname, lname, email, password, confirmpassword,
  } = component.state;
  const dob = inputFields.dateInput.value;
  const {
    fnameError, dobError, emailError, passwordError, confirmpasswordError,
  } = inputFields;

  if (fname.length >= 2) {
    fnameError.innerHTML = '';
    if (validateFname(fname)) {
      fnameError.innerHTML = '';
      if (validateEmail(email)) {
        emailError.innerHTML = '';
        if (validatePassword(password)[1]) {
          passwordError.innerHTML = '';
          if (password === confirmpassword) {
            confirmpasswordError.innerHTML = '';
            if (dob.length !== 0) {
              dobError.innerHTML = '';
              submitForm({
                fname,
                midname,
                lname,
                dateofbirth: dob,
                email,
                password,
                userauthorities: 'SUPERUSER',
              });
            } else {
              dobError.innerHTML = 'Enter your date of birth';
            }
          } else {
            confirmpasswordError.innerHTML = 'Your passwords don\'t match';
          }
        } else {
          passwordError.innerHTML = validatePassword(password)[0];
        }
      } else {
        emailError.innerHTML = 'Enter valid email!';
      }
    } else {
      fnameError.innerHTML = 'Enter valid family name, valid family name is made of letters only!';
    }
  } else {
    fnameError.innerHTML = 'Family name must have atleast 2 characters!';
  }
};
