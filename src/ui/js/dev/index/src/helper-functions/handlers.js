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

// export const handlecurrentlyemployed = (currentlyemployed) => { };

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


/** HANDLE CHANGE */
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

export const handleFieldChange = (event, component) => {
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

/** HANDLE BLUR */
export const handleFnameBlur = (fields) => {
  const { fnameField, fnameError } = fields;
  const fname = fnameField.value;

  if (!validateFname(fname)) {
    fnameError.classList.add('field-error');
    fnameError.innerHTML = `Your application must have a valid Family name, be cautious while 
    you are typing family name, don't put spaces, nor special characters, if you have many names,
    please use middle name and last name fields!`;
  } else {
    fnameError.classList.remove('field-error');
    fnameError.innerHTML = '';
  }
};


export const handleEducationLevelBlur = (fields) => {
  const { educationlevelField, educationlevelError } = fields;
  const educationLevel = educationlevelField.value;

  if (educationLevel.length === 0) {
    educationlevelError.classList.add('field-error');
    educationlevelError.innerHTML = 'Your application is valid if you select your education level!';
  } else {
    educationlevelError.classList.remove('field-error');
    educationlevelError.innerHTML = '';
  }
};

export const handleCodingExperienceBlur = (fields) => {
  const { codingexperienceField, codingexperienceError } = fields;
  const codingexperience = codingexperienceField.value;

  if (codingexperience.length === 0) {
    codingexperienceError.classList.add('field-error');
    codingexperienceError.innerHTML = 'Your application is valid if you select your coding experience!';
  } else {
    codingexperienceError.classList.remove('field-error');
    codingexperienceError.innerHTML = '';
  }
};

export const handleYearOfBirthBlur = (fields) => {
  const { yearofbirthField, yearofbirthError } = fields;
  const codingexperience = yearofbirthField.value;

  if (codingexperience.length === 0) {
    yearofbirthError.classList.add('field-error');
    yearofbirthError.innerHTML = 'Your application is valid if you select your age!';
  } else {
    yearofbirthError.classList.remove('field-error');
    yearofbirthError.innerHTML = '';
  }
};

export const handleSubmitApplication = (component, fields, sendApplicationForm) => {
  const {
    codingexperience,
    currentlyemployed,
    educationlevel,
    email,
    employedbefore,
    fname,
    gender,
    jobposition,
    linkedinprofile,
    lname,
    midname,
    nationality,
    optionofstudy,
    phonenumber,
    yearofbirth,
  } = component.state;
  const {
    emailError,
    fnameError,
    yearofbirthError,
    educationlevelError,
    codingexperienceError,
    currentlyeployedError,
    sendApplicationBtn,
  } = fields;

  if (currentlyemployed.length === 0) {
    currentlyeployedError.innerHTML = 'You must precise if you are employed elsewhere or not!';
  } else if (educationlevel.length === 0) {
    educationlevelError.innerHTML = 'Please precise yourn education level';
  } else if (!validateEmail(email)) {
    emailError.innerHTML = 'Sorry! You cannot send an invalid email!';
  } else if (!validateFname(fname)) {
    fnameError.innerHTML = 'Sorry! A valid family name must not have a special characters, nor spaces';
  } else if (codingexperience.length === 0) {
    codingexperienceError.innerHTML = 'Please, select your coding experience';
  } else if (yearofbirth.length === 0) {
    yearofbirthError.innerHTML = 'Please, precise your age!';
  } else {
    currentlyeployedError.innerHTML = '';
    educationlevelError.innerHTML = '';
    emailError.innerHTML = '';
    fnameError.innerHTML = '';
    codingexperienceError.innerHTML = '';
    yearofbirthError.innerHTML = '';
    const newAppForm = {
      fname,
      midname,
      lname,
      gender,
      nationality,
      currentlyemployed,
      educationlevel,
      optionofstudy,
      employedbefore,
      jobposition,
      codingexperience,
      yearofbirth,
      email,
      phonenumber,
      linkedinprofile,
    };
    sendApplicationBtn.innerText = 'Processing your application';
    sendApplicationForm(newAppForm);
  }
};
