import { validateEmail, validateFname } from '../../../../../../helpers/functions/validations';
import { yearsOfBirth, getNationlitites, getEducationLevels } from '../../../../../../helpers/resources/list-of-needed-resouces';

export const handleFnameTyping = (fields, component) => {
  const { fnameField, fnameError } = fields;
  const fname = fnameField.value;
  if (!validateFname(fname)) {
    fnameError.innerHTML = 'A valid family name doesn\'t include special characters or spaces';
  } else if (fname.length === 0) {
    fnameError.innerHTML = 'Empty family name';
  } else {
    fnameError.innerHTML = '';
    component.setState({ fname });
  }
};

export const handleEducationLevel = (fields) => {
  const { educationlevelField } = fields;
  getEducationLevels().forEach((currEducLevel) => {
    educationlevelField.add(new Option(currEducLevel, currEducLevel));
  });
};

export const handleEmployedBefore = (employmentStatus) => { };

export const handleCodingExperience = (codingExperience) => { };

export const handleCurrentlyEmployed = (currentlyEmployed) => { };

export const handleYearOfBirth = (fields) => {
  const { yearofbirthField } = fields;
  yearsOfBirth().forEach((currYear) => {
    yearofbirthField.add(
      new Option(currYear, currYear),
    );
  });
};

export const handleNationality = (fields) => {
  const { nationalityField } = fields;
  getNationlitites().forEach((currNatiolanality) => {
    nationalityField.add(
      new Option(currNatiolanality, currNatiolanality),
    );
  });
};

export const handleEmail = (fields, checkEmailFromBb) => {
  let emailStatus;
  const { emailError, emailField, emailChecking } = fields;
  const email = emailField.value;

  if (!validateEmail(email)) {
    emailStatus = 'Your email is invalid';
  } else {
    checkEmailFromBb(email);
    emailChecking.classList.remove('hidden-div');
  }
  emailError.innerHTML = emailStatus;
};
