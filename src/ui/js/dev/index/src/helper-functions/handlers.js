import { validateEmail, validateFname } from '../../../../../../helpers/functions/validations';
import {
  yearsOfBirth,
  getNationlitites,
  getEducationLevels,
  getOptionOfStudy,
  getCodingExperience,
} from '../../../../../../helpers/resources/list-of-needed-resouces';

/** DISPLAY OPTIONS */

export const displyEducationLevels = (fields) => {
  const { educationlevelField } = fields;
  getEducationLevels().forEach((currEducLevel) => {
    educationlevelField.add(new Option(currEducLevel, currEducLevel));
  });
};

export const displayOptionsOfStudy = (fields) => {
  const { optionofstudyField } = fields;
  getOptionOfStudy().forEach((currOption) => {
    optionofstudyField.add(new Option(currOption, currOption));
  });
};

// export const handleEmployedBefore = (employmentStatus) => { };

export const displayCodingExperience = (fields) => {
  const { codingexperienceField } = fields;
  getCodingExperience().forEach((currCodExp) => {
    codingexperienceField.add(new Option(currCodExp, currCodExp));
  });
};

// export const handleCurrentlyEmployed = (currentlyEmployed) => { };

export const displayYearOfBirth = (fields) => {
  const { yearofbirthField } = fields;
  yearsOfBirth().forEach((currYear) => {
    yearofbirthField.add(
      new Option(currYear, currYear),
    );
  });
};

export const displayNationality = (fields) => {
  const { nationalityField } = fields;
  getNationlitites().forEach((currNatiolanality) => {
    nationalityField.add(
      new Option(currNatiolanality, currNatiolanality),
    );
  });
};


/** HANDLERS */
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
    console.log(component.state);
  }
};

export const handleTyping = (event, component) => {
  component.setState({ [event.target.name]: event.target.value });
};

export const handleEmailTyping = (fields, checkEmailFromBb) => {
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
