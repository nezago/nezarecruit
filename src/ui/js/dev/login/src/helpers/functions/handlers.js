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
              if (!response.thisUser[0].is_registration_completed) {
                resultDivHolder.innerHTML = '<span class="text-success">Congratulations, Go ahead!</span>';
                lockedBtn.classList.add('hidden-div');
                unlockedBtn.classList.remove('hidden-div');
                component.setState({ thisUser: response.thisUser[0] });
              } else {
                resultDivHolder.innerHTML = `<span class="text-danger">Sorry! The ID Card Number you are trying
                to use, has already done with the registration!</span>`;
              }
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
    }).catch(() => {
      // console.log(err.response.data);
    });
  } else {
    resultDivHolder.innerHTML = 16 - typedIdCardNumber.length;
    lockedBtn.classList.remove('hidden-div');
    unlockedBtn.classList.add('hidden-div');
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

// handle register-btn clicked
export const handleRegisterBtnClicked = (component) => {
  const {
    // companynameField,
    dateofbirthField,
    dateofbirthError,
    emailField,
    emailError,
    passwordField,
    passwordError,
    confirmpasswordField,
    confirmpasswordError,
    generalformError,
    registerBtn,
  } = component.state.inputFields;
  // const companynameValue = companynameField.value;
  const dateofbirthValue = dateofbirthField.value;
  const emailValue = emailField.value;
  const passwordValue = passwordField.value;
  const confirmpasswordValue = confirmpasswordField.value;
  const {
    user_id_card_id,
    user_id_card_number,
    user_fname,
    user_midname,
    user_lname,
    user_authorities,
  } = component.state.thisUser;
  const { isEmailTaken } = component.state;
  console.log(component.state.thisUser);

  if (user_id_card_number && user_fname && user_authorities) {
    if (dateofbirthValue.length !== 0) {
      dateofbirthError.innerHTML = '';
      if (validateEmail(emailValue)) {
        emailError.innerHTML = '';
        if (!isEmailTaken) {
          if (validatePassword(passwordValue, emailValue)[1]) {
            passwordError.innerHTML = '';
            if (passwordValue === confirmpasswordValue) {
              confirmpasswordError.innerHTML = '';

              registerBtn.innerHTML = `
              <span class="spinner-border spinner-border-sm text-warning"/>
              <span class="spinner-grow spinner-grow-sm text-warning"/>
              `;
              registerBtn.setAttribute('disabled', true);
              /** NOW EVERYTHING IS COOL */
              const dataToSend = {
                useridcardnumber: user_id_card_number,
                useridcardid: user_id_card_id,
                fname: user_fname,
                midname: user_midname,
                lname: user_lname,
                dateofbirth: dateofbirthValue,
                email: emailValue,
                password: passwordValue,
                userauthorities: user_authorities,
              };
              axios.post('/users/register-new-user', dataToSend).then((res) => {
                const { login, token } = res.data;
                if (login) {
                  window.localStorage.setItem('oauth', token);
                  window.location.replace(`/auth/auth-user?redirect=true&oauth=${window.localStorage.getItem('oauth')}`);
                }
              }).catch((err) => {
                generalformError.innerHTML = err.response.data.info;
              });
            } else {
              confirmpasswordError.innerHTML = 'Password mismacthes';
            }
          } else {
            passwordError.innerHTML = validatePassword(passwordValue, emailValue)[0];
          }
        } else { emailError.innerHTML = 'Sorry! You cannot save an already registered email'; }
      } else {
        emailError.innerHTML = 'You cannot save an invalid email';
      }
    } else {
      dateofbirthError.innerHTML = 'Please select your date of birth';
    }
  } else {
    generalformError.innerHTML = 'Your ID Number is not verified';
  }
};


/**
 * ====================================================================================
 * ====================================================================================
 * =====================FUNCTIONS TO HANDLE LOGIN FORM=================================
 * ====================================================================================
 * ====================================================================================
 */
export const handleLoginEmailTyping = (component) => {
  const { emailField, errorField, loginBtn } = component.state.necessaryFields;
  if (validateEmail(emailField.value)) {
    loginBtn.classList.add('hidden-div');
    errorField.innerHTML = '<span class="text-warning spinner-border spinner-grow-sm"/>';
    axios.post('/users/check-existance-of-email', { email: emailField.value }).then((res) => {
      if (res.data) {
        loginBtn.classList.remove('hidden-div');
        errorField.innerHTML = '';
        component.setState({ isEmailValid: true });
      } else {
        loginBtn.classList.add('hidden-div');
        errorField.innerHTML = 'The email you typed doesn\'t exist in our databases';
      }
    });
  }
};

export const handleSubmitLoginForm = (component) => {
  const { emailField, passwordField, errorField } = component.state.necessaryFields;

  if (validateEmail(emailField.value)) {
    errorField.innerHTML = '<span class="text-warning spinner-grow-sm spinner-border"/>';
    const dataToSend = { email: emailField.value, password: passwordField.value };
    axios.post('/users/login', dataToSend).then((res) => {
      const gotenLoginInfo = res.data;
      if (gotenLoginInfo.login) {
        window.localStorage.setItem('oauth', gotenLoginInfo.token);
        window.location.replace(`/auth/auth-user?redirect=true&oauth=${window.localStorage.getItem('oauth')}`);
      }
    }).catch((err) => {
      errorField.innerHTML = err.response.data;
    });
  }
};
