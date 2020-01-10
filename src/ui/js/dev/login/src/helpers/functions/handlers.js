/* eslint-disable prefer-destructuring */
import axios from 'axios';
import {
  validatePassword, validateEmail,
} from '../../../../../../../helpers/functions/validations';

/**
 * ================================================================================
 * ================================================================================
 * ==========================FUNCTIONS TO HANDLE CHECK ID CARD NUMBER==============
 * ================================================================================
 * ================================================================================
 */
export const handleIdCardNumberTyping = (component) => {
  const {
    idCardNumberInputField,
    resultDivHolder,
    lockedBtn,
    unlockedBtn,
  } = component.state.inputFields;
  const typedIdCardNumber = idCardNumberInputField.value;
  if (typedIdCardNumber.length === 16) {
    resultDivHolder.innerHTML = '<span class="spinner-border spinner-border-lg text-warning"/>';
    axios.post('/user-id-card-number/check-if-id-card-number-exists',
      { useridcardnumber: typedIdCardNumber }).then((res) => {
      const response = res.data;
      if (response.isUserIdchecked) {
        if (response.isUserExists) {
          if (response.isUserActive) {
            if (response.isUserRetrieved) {
              resultDivHolder.innerHTML = '<span class="text-success">Congratulations, Go ahead!</span>';
              lockedBtn.classList.add('hidden-div');
              unlockedBtn.classList.remove('hidden-div');
              component.setState({ thisUser: response.thisUser[0] });
            } else {
              resultDivHolder.innerHTML = `<span class="text-danger">Your ID Card number is registered,
              and your account is active, but we failed to get your info from the database, this is not your fault,
              please refresh and type again your id card number to try again. Thank you for your good understanding!
              </span>`;
            }
          } else {
            resultDivHolder.innerHTML = '<span class="text-danger">Sorry! Your account is closed!</span>';
            lockedBtn.classList.remove('hidden-div');
            unlockedBtn.classList.add('hidden-div');
          }
        } else {
          resultDivHolder.innerHTML = '<span class="text-danger">Sorry! This ID Card number is not registered yet</span>';
          lockedBtn.classList.remove('hidden-div');
          unlockedBtn.classList.add('hidden-div');
        }
      }
    }).catch((err) => {
      console.log(err.response.data);
    });
  } else {
    resultDivHolder.innerHTML = 16 - typedIdCardNumber.length;
  }
};

export const handleClickHereToSignupBtnClicked = (component) => {
  const {
    checkIdCardNumberDiv, applicationFromContainerDiv,
  } = component.state.inputFields;
  checkIdCardNumberDiv.classList.add('hidden-div');
  applicationFromContainerDiv.classList.remove('hidden-div');
};

/**
 * =====================================================================================
 * =====================================================================================
 * ======================FUNCTIONS TO HANDLE SIGNUP FORM================================
 * =====================================================================================
 * =====================================================================================
 */

// handle email typing
export const handleEmailTyping = (component) => {
  const { emailField, emailError } = component.state.inputFields;
  if (validateEmail(emailField.value)) {
    emailError.innerHTML = '<span class="spinner-border"/>';
    axios.post('/users/check-existance-of-email', { email: emailField.value }).then((res) => {
      if (res.data) {
        emailError.innerHTML = 'This email is taken';
        component.setState({ isEmailTaken: true });
      } else {
        emailError.innerHTML = '';
        component.setState({ isEmailTaken: false });
      }
    // eslint-disable-next-line no-unused-vars
    }).catch((err) => {
      emailError.innerHTML = 'Couldn\'t Check from the database, delete it and re-type it, or refresh the page';
      component.setState({ isEmailTaken: undefined });
    });
  } else {
    emailError.innerHTML = 'Invalid Email';
  }
};

// handle email blur
export const handleEmailBlur = (component) => {
  const { emailField } = component.state.inputFields;
  if (emailField.value.length === 0) {
    emailField.classList.add('field-error');
  } else {
    emailField.classList.remove('field-error');
  }
};

// handle password typing
export const handlePasswordTyping = (component) => {
  const {
    emailField, passwordField, passwordError,
  } = component.state.inputFields;
  const passwordValue = passwordField.value;
  const emailValue = emailField.value;
  if (validatePassword(passwordValue, emailValue)[1]) {
    passwordError.innerHTML = `<span class="text-success">
    ${validatePassword(passwordValue, emailValue)[0]}</span>`;
  } else {
    passwordError.innerHTML = validatePassword(passwordValue, emailValue)[0];
  }
};

// handle password blur
export const handlePasswordBlur = (component) => {
  const { passwordField } = component.state.inputFields;
  if (passwordField.value.length < 4) {
    passwordField.classList.add('field-error');
  } else {
    passwordField.classList.remove('field-error');
  }
};

// handle conform password typing
export const handleConfirmPasswordTyping = (component) => {
  const {
    passwordField, confirmpasswordField, confirmpasswordError,
  } = component.state.inputFields;
  if (passwordField.value !== confirmpasswordField.value) {
    confirmpasswordError.innerHTML = 'Passwords missmatching';
  } else {
    confirmpasswordError.innerHTML = '';
  }
};
