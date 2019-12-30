export const validateEmail = (mail) => {
  const mailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!mail.match(mailRegExp)) {
    return false;
  }
  return true;
};

export const validatePassword = (password, email) => {
  let passwordInfo;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (password !== email) {
    if (password.match(passwordRegex)) {
      passwordInfo = 'We believe your password is strong!';
      return [passwordInfo, true];
    }
    passwordInfo = 'Your password must include at least one capital letter, one number digit, one special character, and be between 8 to 15 characters!';
    return [passwordInfo, false];
  }
  passwordInfo = 'Your password must not be the same as your email!';
  return [passwordInfo, false];
};

export const validateFname = (fname) => {
  const letters = /^[A-Za-z]+$/;
  if (!fname.match(letters)) {
    return false;
  }
  return true;
};
