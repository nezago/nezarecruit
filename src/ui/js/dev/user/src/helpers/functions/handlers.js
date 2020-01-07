/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import axios from 'axios';
import validator from 'validator';
import {
  getFontFamilies,
  getFontSizes,
  getOauth,
  getUserInfo,
} from '../../../../../../../helpers/resources/list-of-needed-resouces';
import { validateEmail } from '../../../../../../../helpers/functions/validations';
import { getCurrentYear, getDateFromDateTime, getTimeFromDateTime } from '../../../../../../../helpers/functions/general-handlers';

/** handlers */
export const handleAsideNavItemClicked = (event, necessaryFields) => {
  const currClickedTabId = event.target.id;
  const currClickedDiv = document.getElementById(currClickedTabId);
  const {
    allResultDiv,
    unRepliedApplicationsDiv,
    repliedApplicationsDiv,
    allApplicationsTab,
    unRepliedApplicationsTab,
    repliedApplicationsTab,
  } = necessaryFields;

  if (currClickedTabId === 'allApplicationsTab') {
    /** SHOWING ACTIVE TAB AND DESIRED DIV */
    allResultDiv.classList.remove('hidden-div');
    currClickedDiv.classList.add('active-tab');
    currClickedDiv.classList.add('color-dark-purple');

    /** HIDDING UNDESIRED DIVS */
    unRepliedApplicationsDiv.classList.add('hidden-div');
    repliedApplicationsDiv.classList.add('hidden-div');

    /** DEACTIVATING UNACTIVE TABS */
    unRepliedApplicationsTab.classList.remove('active-tab');
    unRepliedApplicationsTab.classList.remove('color-dark-purple');
    repliedApplicationsTab.classList.remove('active-tab');
    repliedApplicationsTab.classList.remove('color-dark-purple');
  } else if (currClickedTabId === 'unRepliedApplicationsTab') {
    /** SHOWING ACTIVE TAB AND DESIRED DIV */
    unRepliedApplicationsDiv.classList.remove('hidden-div');
    currClickedDiv.classList.add('active-tab');
    currClickedDiv.classList.add('color-dark-purple');

    /** HIDDING UN DESIRED DIV */
    allResultDiv.classList.add('hidden-div');
    repliedApplicationsDiv.classList.add('hidden-div');

    /** DEACTIVATING UNACTIVE TABS */
    allApplicationsTab.classList.remove('active-tab');
    allApplicationsTab.classList.remove('color-dark-purple');
    repliedApplicationsTab.classList.remove('active-tab');
    repliedApplicationsTab.classList.remove('color-dark-purple');
  } else if (currClickedTabId === 'repliedApplicationsTab') {
    /** SHOWING ACTIVE TAB AND DESIRED DIV */
    repliedApplicationsDiv.classList.remove('hidden-div');
    currClickedDiv.classList.add('active-tab');
    currClickedDiv.classList.add('color-dark-purple');

    /** HIDDING UNDESIRED DIVS */
    allResultDiv.classList.add('hidden-div');
    unRepliedApplicationsDiv.classList.add('hidden-div');

    /** DEACTIVATING UNACTIVE TABS */
    allApplicationsTab.classList.remove('active-tab');
    unRepliedApplicationsTab.classList.remove('active-tab');
    allApplicationsTab.classList.remove('color-dark-purple');
    unRepliedApplicationsTab.classList.remove('color-dark-purple');
  }
};
export const handleSingleApplicantClicled = (event, application, necessaryFields) => {
  const {
    allResultDiv,
    unRepliedApplicationsDiv,
    repliedApplicationsDiv,
    applicantDetails,
    backToListBtn,
    emailingDiv,
    sendEmailResultDiv,
    emailBtnOption,
  } = necessaryFields;
  if (event.target.tagName !== 'BUTTON') {
    /**
     * ********PREPARING WORKING EVIRONMENT***********
     *
     *
     *
     *  1.hiding some divs
     *
     *
     * */
    allResultDiv.classList.add('hidden-div');
    unRepliedApplicationsDiv.classList.add('hidden-div');
    repliedApplicationsDiv.classList.add('hidden-div');
    applicantDetails.classList.remove('hidden-div');
    backToListBtn.classList.remove('hidden-div');
    emailBtnOption.classList.remove('btn-outline-danger');
    emailBtnOption.classList.add('btn-primary');
    emailBtnOption.innerText = 'Send email';
    emailingDiv.classList.add('hidden-div');
    sendEmailResultDiv.classList.add('hidden-div');


    axios.post('/applications/update-read-from-application-table',
      { application_id: application.application_id });
    applicantDetails.innerHTML = (`
  <div class="color-grey-transparent">
    <div>
      <h1 class="text-center">
        <span fname-span>${application.fname}</span>
        <span>${application.middle_name}</span>
        <span>${application.lname}</span>
        <span>${getCurrentYear() - application.year_of_birth} years old</span>
      </h1>
    </div>
    <div class="p-2 white-bordered-element-1">
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Gender : </span>
        <span class="float-right">${application.gender}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Level of education : </span>
        <span class="float-right">${application.education_level}</span>
      </div>

      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Option of study : </span>
        <span class="float-right">${application.option_of_study}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Coding experience : </span>
        <span class="float-right">${application.coding_experience}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Currently employed? : </span>
        <span class="float-right">${application.currently_employed}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>E-mail : </span>
        <span email-span class="float-right">${application.email}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Employed before? : </span>
        <span class="float-right">${application.employed_before}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>What was your job position? : </span>
        <span class="float-right">${application.job_position
        ? application.job_position : 'Never had a job'}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>LinkedIn profile : </span>
        <span class="float-right">
        <a href=${application.linkedin_profile} target="_blank" rel="noreferrer noopener">
        ${application.fname} on LinkedIn</a></span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Nationality : </span>
        <span class="float-right">${application.nationality}</span>
      </div>
      <div class="color-dark-purple text-17 p-2 mt-2">
        <span>Applied on : </span>
        <span class="float-right">${getDateFromDateTime(application.applied_at)}
        at ${getTimeFromDateTime(application.applied_at)}</span>
      </div>
    </div>
  </div>
  `);
  }
};

/** HANDLING SINGLE SENT EMAIL CLICKED */
export const handleSingleSentEmailClicked = (event, singleSentEmail, necessaryFields) => {
  const {
    sentEmailDetails,
    allResultDiv,
    backToListDiv,
  } = necessaryFields;
  if (event.target.tagName !== 'BUTTON') {
    /**
     * ********PREPARING WORKING EVIRONMENT***********
     *
     *  1.hiding and unhiding some divs
     *
     * */
    allResultDiv.classList.add('hidden-div');
    sentEmailDetails.classList.remove('hidden-div');
    backToListDiv.classList.remove('hidden-div');

    sentEmailDetails.innerHTML = (`
  <div class="color-dark-purple">
    <div class="p-2 white-bordered-element-1">
      <div class="text-17 p-2 mt-2">
        <span>Applicant's email : </span>
        <span class="float-right">${singleSentEmail.email_address}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>The email sent on : </span>
        <span class="float-right">${getDateFromDateTime(singleSentEmail.sent_on)}
        at ${getTimeFromDateTime(singleSentEmail.sent_on)}</span>
      </div>

      <div class="text-17 p-2 mt-2">
        <span>The email sent by (recruiter's email) : </span>
        <span class="float-right">${singleSentEmail.sender_email_address}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>The email subject : </span>
        <span class="float-right">${singleSentEmail.email_subject}</span>
      </div>
      <div class="text-17 p-2 mt-2">
        <span>Message : </span>
        <span class="float-right color-dark-purple p-5">${singleSentEmail.email_message}</span>
      </div>
    </div>
  </div>
  `);
  }
};

export const handleBackToListClickedFromApplicantDetails = (necessaryFields) => {
  const {
    allResultDiv,
    applicantDetails,
    backToListBtn,
    emailingDiv,
    sendEmailResultDiv,
  } = necessaryFields;
  allResultDiv.classList.remove('hidden-div');
  applicantDetails.classList.add('hidden-div');
  backToListBtn.classList.add('hidden-div');
  emailingDiv.classList.add('hidden-div');
  sendEmailResultDiv.classList.add('hidden-div');
};

/** to go back from applicant details, to list of all applicants */
export const handleBackToListClickedFromEmailDetails = (necessaryFields) => {
  const {
    allResultDiv,
    sentEmailDetails,
    backToListDiv,
  } = necessaryFields;
  allResultDiv.classList.remove('hidden-div');
  sentEmailDetails.classList.add('hidden-div');
  backToListDiv.classList.add('hidden-div');
};

/** to go back from sent email details, to list of all emails */
export const handleCloseSingleResultClicked = (event) => {
  const allDivs = document.querySelectorAll('div');
  const currentId = event.target.id;
  allDivs.forEach((currDiv) => {
    if (currDiv.id === currentId) {
      currDiv.classList.add('hidden-div');
    }
  });
};

/** when send email btn clicked, the btn in applicant details */
export const handleEmailBtnClicked = (necessaryFields) => {
  const {
    emailingDiv,
    recipientEmail,
    emailSubject,
    emailMsgIframe,
    sendEmailResultDiv,
    sendMsgBtn,
    spanSpinnerGrow,
    spanSpinnerBorder,
    spanSendMsg,
    sendEmailErrorDiv,
    emailBtnOption,
  } = necessaryFields;
  /** UNHIDDING EMAILING DIV */
  emailingDiv.classList.remove('hidden-div');

  /** PREPARING WORKING ENVIRONMENT */
  const iframeContent = emailMsgIframe.contentDocument
    || emailMsgIframe.contentWindow.document;
  iframeContent.body.innerHTML = '';
  emailSubject.value = '';
  sendMsgBtn.classList.remove('btn-info');
  sendMsgBtn.classList.remove('rounded-corners');
  sendMsgBtn.classList.add('btn-success');
  spanSendMsg.innerHTML = 'Click here to Send Message';
  sendEmailResultDiv.classList.add('hidden-div');
  sendEmailErrorDiv.classList.add('hidden-div');

  spanSpinnerBorder.forEach((currSpan) => {
    currSpan.classList.remove('spinner-border');
    currSpan.classList.remove('spinner-border-sm');
    currSpan.classList.remove('text-warning');
    currSpan.classList.remove('mr-2');
  });

  spanSpinnerGrow.forEach((currSpan) => {
    currSpan.classList.remove('spinner-grow');
    currSpan.classList.remove('spinner-grow-sm');
    currSpan.classList.remove('text-warning');
    currSpan.classList.remove('mr-2');
  });

  window.scrollBy(0, 900);
  recipientEmail.value = document.querySelector('span[email-span]').innerText;

  emailBtnOption.classList.remove('btn-primary');
  emailBtnOption.classList.add('btn-outline-danger');
  emailBtnOption.innerText = 'Reset all fields';
};

/** HANDLE EMAIL EDITING */
export const handleTypingEmailInIframe = () => {
  // eslint-disable-next-line no-undef
  const editor = emailMsgIframe.document;
  editor.designMode = 'on';

  /** bold */
  boldBtn.addEventListener('click', () => {
    editor.execCommand('bold', false, null);
  }, false);

  /** italic */
  italicBtn.addEventListener('click', () => {
    editor.execCommand('Italic', false, null);
  }, false);

  /** underline */
  underlineBtn.addEventListener('click', () => {
    editor.execCommand('Underline', false, null);
  }, false);

  /** left justify */
  justifyLeftBtn.addEventListener('click', () => {
    editor.execCommand('justifyLeft', false, null);
  }, false);

  /** Center justify */
  justifyCenterBtn.addEventListener('click', () => {
    editor.execCommand('justifyCenter', false, null);
  }, false);

  /** Right justify */
  justifyRightBtn.addEventListener('click', () => {
    editor.execCommand('justifyRight', false, null);
  }, false);

  /** Full justify */
  justifyFullBtn.addEventListener('click', () => {
    editor.execCommand('justifyFull', false, null);
  }, false);

  /** superscript */
  supBtn.addEventListener('click', () => {
    editor.execCommand('Superscript', false, null);
  }, false);

  /** subscript */
  subBtn.addEventListener('click', () => {
    editor.execCommand('Subscript', false, null);
  }, false);

  /** strikethrough */
  strikeBtn.addEventListener('click', () => {
    editor.execCommand('Strikethrough', false, null);
  }, false);

  /** orderedlist */
  orderedListBtn.addEventListener('click', () => {
    editor.execCommand('InsertOrderedList', false, `newOL${Math.round(Math.random() * 100)}`);
  }, false);

  /** unorderedlist */
  unorderedListBtn.addEventListener('click', () => {
    editor.execCommand('InsertUnOrderedList', false, `newOL${Math.round(Math.random() * 100)}`);
  }, false);

  /** fontcolor */
  fontcolorBtn.addEventListener('change', (event) => {
    editor.execCommand('ForeColor', false, event.target.value);
  }, false);

  /** backgroundcolor */
  highlightBtn.addEventListener('change', (event) => {
    editor.execCommand('BackColor', false, event.target.value);
  }, false);

  /** fontfamily */
  fontChanger.addEventListener('change', (event) => {
    editor.execCommand('fontName', false, event.target.value);
  }, false);

  /** fontSizes */
  fontSize.addEventListener('change', (event) => {
    editor.execCommand('fontSize', false, event.target.value);
  }, false);

  /** link */
  linkBtn.addEventListener('click', () => {
    const url = prompt('Enter your url please : ', 'http://');
    editor.execCommand('CreateLink', false, url);
  }, false);

  /** unlink */
  unlinkBtn.addEventListener('click', () => {
    editor.execCommand('UnLink', false, null);
  }, false);

  /** undo */
  undoBtn.addEventListener('click', () => {
    editor.execCommand('undo', false, null);
  }, false);

  /** redo */
  redoBtn.addEventListener('click', () => {
    editor.execCommand('redo', false, null);
  }, false);
  /** backspace */
  backspaceBtn.addEventListener('click', () => {
    editor.execCommand('delete', false, null);
  }, false);

  /** copy */
  copyBtn.addEventListener('click', () => {
    editor.execCommand('copy', false, null);
  }, false);

  /** cut */
  cutBtn.addEventListener('click', () => {
    editor.execCommand('cut', false, null);
  }, false);

  /** selectAll */
  selectAllBtn.addEventListener('click', () => {
    editor.execCommand('selectAll', false, null);
  }, false);

// /** insert an image */
//   attachPictBtn.addEventListener('click', () => {
//     editor.execCommand('insertImage', false, null);
//   }, false);
};

export const displayFontFamilies = (fontChanger) => {
  const selectOption = fontChanger;
  getFontFamilies().forEach((currFont) => {
    selectOption.add(new Option(currFont, currFont));
  });
  /** styling them */
  const fonts = document.querySelectorAll('select#fontChanger > option');
  fonts.forEach((currOption) => {
    // eslint-disable-next-line no-param-reassign
    currOption.style.fontFamily = currOption.value;
  });
};

export const displayFontSizes = (fontSize) => {
  const fontSizeField = fontSize;
  getFontSizes().forEach((currFontSize) => {
    fontSizeField.add(new Option(currFontSize, currFontSize));
  });
};

export const handleSendEmailMsgBtnClicked = (necessaryFields) => {
  const {
    recipientEmail,
    emailSubject,
    emailMsgIframe,
    emailingDiv,
    sendEmailResultDiv,
    sendMsgBtn,
    spanSpinnerBorder,
    spanSpinnerGrow,
    spanSendMsg,
    sendEmailResultContainer,
    sendEmailErrorDiv,
  } = necessaryFields;


  const emailMsgHtml = emailMsgIframe.contentDocument || emailMsgIframe.contentWindow.document;
  const emailAddr = recipientEmail.value;
  const emailSubjec = emailSubject.value;
  const myEmailMsg = emailMsgHtml.body.innerHTML;
  const emailMsg = `<div>${myEmailMsg}</div>`;
  const senderEmailAddress = getUserInfo().email;

  if (!validateEmail(emailAddr)) {
    sendEmailErrorDiv.innerHTML = 'No email address found, please refresh the browser and try';
  } else if (emailSubjec.length === 0) {
    sendEmailErrorDiv.innerHTML = 'It is impossible to send an email with no subject!';
  } else if (myEmailMsg.length === 0) {
    sendEmailErrorDiv.innerHTML = 'Write something please, you cannot send an empty email message!';
  } else {
    /** ALL NEEDED VALIDATIONS ARE NOW DONE */

    const isSendConfirmed = confirm(`
    Are you sure, you want to send the email to ${emailAddr}?
    Check carefully if you have typed whatever you wanted and click yes.`);
    if (isSendConfirmed) {
      /** transforming btn send when is clicked */
      sendMsgBtn.classList.remove('btn-success');
      sendMsgBtn.classList.add('btn-info');
      sendMsgBtn.classList.add('rounded-corners');
      sendMsgBtn.classList.add('text-17');

      spanSpinnerBorder.forEach((currSpan) => {
        currSpan.classList.add('spinner-border');
        currSpan.classList.add('spinner-border-sm');
        currSpan.classList.add('text-warning');
        currSpan.classList.add('mr-2');
      });

      spanSpinnerGrow.forEach((currSpan) => {
        currSpan.classList.add('spinner-grow');
        currSpan.classList.add('spinner-grow-sm');
        currSpan.classList.add('text-warning');
        currSpan.classList.add('mr-2');
      });

      spanSendMsg.innerHTML = 'Sending your email';


      const msgToSend = {
        emailAddr,
        emailSubject: emailSubjec,
        senderEmailAddress,
        emailMsg,
      };

      sendEmailErrorDiv.innerHTML = '';
      axios.post('/applications/send-e-mail', msgToSend,
        { headers: getOauth() }).then((res) => {
        emailingDiv.classList.add('hidden-div');
        sendEmailResultDiv.classList.remove('hidden-div');
        sendEmailResultContainer.innerHTML = res.data.message;
        axios.post('/applications/update-replied-from-application-table',
          { email: emailAddr, status: true });
      }).catch((err) => {
        emailingDiv.classList.add('hidden-div');
        sendEmailResultDiv.classList.remove('hidden-div');
        sendEmailResultContainer.innerHTML = err.response.data.message;
      });
    }
  }
};

/** ============================================================================
 *
 * HANDLE MANAGE HOMEPAGE
 *
 */
export const displayFontSizesInManageHomepage = (fontSizeField) => {
  getFontSizes().forEach((currFontSize) => {
    fontSizeField.add(new Option(currFontSize, currFontSize));
  });
};
export const displayFontSize2InManageHomepage = (fontSizeField2) => {
  getFontSizes().forEach((currFontSize) => {
    fontSizeField2.add(new Option(currFontSize, currFontSize));
  });
};

export const displayFontFamiliesInManageHomepage = (fontFamilyFields) => {
  getFontFamilies().forEach((currFont) => {
    fontFamilyFields.add(new Option(currFont, currFont));
  });
};
export const displayFontFamilie2InManageHomepage = (fontFamilyField2) => {
  getFontFamilies().forEach((currFont) => {
    fontFamilyField2.add(new Option(currFont, currFont));
  });
};


/** HANDLE WHY NEZARECRUIT EDITING */
export const handleTypingWhyNezarecuritInIframe = () => {
  // eslint-disable-next-line no-undef
  const editor2 = whyNezarecruitIframe.document;
  editor2.designMode = 'on';

  /** bold */
  boldBtn2.addEventListener('click', () => {
    editor2.execCommand('bold', false, null);
  }, false);

  /** italic */
  italicBtn2.addEventListener('click', () => {
    editor2.execCommand('Italic', false, null);
  }, false);

  /** underline */
  underlineBtn2.addEventListener('click', () => {
    editor2.execCommand('Underline', false, null);
  }, false);

  /** left justify */
  justifyLeftBtn2.addEventListener('click', () => {
    editor2.execCommand('justifyLeft', false, null);
  }, false);

  /** Center justify */
  justifyCenterBtn2.addEventListener('click', () => {
    editor2.execCommand('justifyCenter', false, null);
  }, false);

  /** Right justify */
  justifyRightBtn2.addEventListener('click', () => {
    editor2.execCommand('justifyRight', false, null);
  }, false);

  /** Full justify */
  justifyFullBtn2.addEventListener('click', () => {
    editor2.execCommand('justifyFull', false, null);
  }, false);

  /** superscript */
  supBtn2.addEventListener('click', () => {
    editor2.execCommand('Superscript', false, null);
  }, false);

  /** subscript */
  subBtn2.addEventListener('click', () => {
    editor2.execCommand('Subscript', false, null);
  }, false);

  /** strikethrough */
  strikeBtn2.addEventListener('click', () => {
    editor2.execCommand('Strikethrough', false, null);
  }, false);

  /** orderedlist */
  orderedListBtn2.addEventListener('click', () => {
    editor2.execCommand('InsertOrderedList', false, `newOL${Math.round(Math.random() * 100)}`);
  }, false);

  /** unorderedlist */
  unorderedListBtn2.addEventListener('click', () => {
    editor2.execCommand('InsertUnOrderedList', false, `newOL${Math.round(Math.random() * 100)}`);
  }, false);

  /** fontcolor */
  fontcolorBtn2.addEventListener('change', (event) => {
    editor2.execCommand('ForeColor', false, event.target.value);
  }, false);

  /** backgroundcolor */
  highlightBtn2.addEventListener('change', (event) => {
    editor2.execCommand('BackColor', false, event.target.value);
  }, false);

  /** fontfamily */
  fontChanger2.addEventListener('change', (event) => {
    editor2.execCommand('fontName', false, event.target.value);
  }, false);

  /** fontSizes */
  fontSize2.addEventListener('change', (event) => {
    editor2.execCommand('fontSize', false, event.target.value);
  }, false);

  /** link */
  linkBtn2.addEventListener('click', () => {
    const url = prompt('Enter your url please : ', 'http://');
    editor2.execCommand('CreateLink', false, url);
  }, false);

  /** unlink */
  unlinkBtn2.addEventListener('click', () => {
    editor2.execCommand('UnLink', false, null);
  }, false);

  /** undo */
  undoBtn2.addEventListener('click', () => {
    editor2.execCommand('undo', false, null);
  }, false);

  /** redo */
  redoBtn2.addEventListener('click', () => {
    editor2.execCommand('redo', false, null);
  }, false);
  /** backspace */
  backspaceBtn2.addEventListener('click', () => {
    editor2.execCommand('delete', false, null);
  }, false);

  /** copy */
  copyBtn2.addEventListener('click', () => {
    editor2.execCommand('copy', false, null);
  }, false);

  /** cut */
  cutBtn2.addEventListener('click', () => {
    editor2.execCommand('cut', false, null);
  }, false);

  /** selectAll */
  selectAllBtn2.addEventListener('click', () => {
    editor2.execCommand('selectAll', false, null);
  }, false);
};

export const handleSaveAmanage = (necessaryFields) => {
  const {
    whyNezarecruitTitle,
    whyNezarecruitIframe,
    whatNezarecruitTitle,
    emailMsgIframe,
    saveManageErrorDiv,
    saveManageResultDiv,
    saveManageResultContainer,
  } = necessaryFields;

  let currUserEmail;
  let isRequestValid = false;
  if (getUserInfo() !== null) {
    currUserEmail = getUserInfo().email;
  } else {
    currUserEmail = '';
  }
  const whatNezarecruitDoc = whyNezarecruitIframe.contentDocument
    || whyNezarecruitIframe.contentWindow.document;
  const whyNezaRecruitDoc = emailMsgIframe.contentDocument
    || emailMsgIframe.contentWindow.document;

  const whatNezaHtml = whatNezarecruitDoc.body.innerHTML;
  const whyNezaHtml = whyNezaRecruitDoc.body.innerHTML;

  const whatNezaTitle = `<h3>${whatNezarecruitTitle.value}</h3>`;
  const whatNezaHtmlToSend = `<div>${whatNezaHtml}</div>`;
  const whyNezaTitle = `<h3>${whyNezarecruitTitle.value}</h3>`;
  const whyNezaHtmlToSend = `<div>${whyNezaHtml}</div>`;

  if (whatNezaHtml.length === 0 && whyNezaHtml.length === 0) {
    saveManageErrorDiv.innerHTML = '<span>Add either a what or why neza recruit</span>';
  } else {
    saveManageErrorDiv.innerHTML = '';
    if (!validateEmail(currUserEmail)) {
      saveManageErrorDiv.innerHTML = `<span>We have trouble getting your email,
      Login first and try again!</span > `;
    } else {
      saveManageErrorDiv.innerHTML = '';
      isRequestValid = true;
      const dataToSend = {
        isRequestValid,
        whatNezaTitle,
        whatNezarecruitContent: whatNezaHtmlToSend,
        whyNezaTitle,
        whyNezarecruitContent: whyNezaHtmlToSend,
        manageCreatorEmail: currUserEmail,
      };
      axios.post('/manage-homepage/add-new-manage-homepage',
        dataToSend, { headers: getOauth() }).then((res) => {
        saveManageResultDiv.classList.remove('hidden-div');
        saveManageResultContainer.innerHTML = `<span>${res.data}</span>`;
      }).catch((err) => {
        saveManageResultDiv.classList.remove('hidden-div');
        saveManageResultContainer.innerHTML = `<span>${err.response.data}</span>`;
      });
    }
  }
};


/**
 * =====================================================================================
 * =====================================================================================
 * ======================FUNCTIONS TO HANDLE CreateJoLayout=============================
 * =====================================================================================
 * =====================================================================================
 * */

export const handleJobRequirementsAdded = (necessaryFields) => {
  const {
    jobRequirementInputField,
    jobRequirementDisplayDiv,
    jobRequirementError,
  } = necessaryFields;

  const addedJobReq = jobRequirementInputField.value;
  if (addedJobReq.length === 0) {
    jobRequirementError.innerHTML = 'You must write some job requirement!';
  } else {
    jobRequirementError.innerHTML = '';
    const addeddJobSpan = document.createElement('span');
    const breakingElt = document.createElement('br');
    addeddJobSpan.innerHTML = `&#10004;   ${addedJobReq}`;
    jobRequirementDisplayDiv.appendChild(addeddJobSpan);
    jobRequirementDisplayDiv.appendChild(breakingElt);
    jobRequirementInputField.value = '';
  }
};

/** HANDLING CREATING JOB DECISION BUTTON */
export const handleAppFormUrlOrCustom = (event, necessaryFields) => {
  const {
    applicationFormUrlDiv,
    customApplicationFormDiv,
  } = necessaryFields;
  const clickedBtn = event.target.id;
  if (clickedBtn === 'application-form-url-btn') {
    applicationFormUrlDiv.classList.remove('hidden-div');
    customApplicationFormDiv.classList.add('hidden-div');
  } else if (clickedBtn === 'custom-application-form-btn') {
    applicationFormUrlDiv.classList.add('hidden-div');
    customApplicationFormDiv.classList.remove('hidden-div');
  }
};

/** HANDLING COMPANY EMAIL TYPING */
export const handleCompanyEmailTyping = (necessaryFields) => {
  const {
    companyemailfield,
    companyemailfieldError,
  } = necessaryFields;
  const companyemail = companyemailfield.value;
  if (validator.isEmail(companyemail)) {
    companyemailfieldError.innerHTML = '';
  } else {
    companyemailfieldError.innerHTML = 'Invalid email, you cannot save the job details with it!';
  }
};

/** HANDLING JOB SAVE JOB BTN CLICKED */
export const handleSaveJobBtnClicked = (component) => {
  const {
    jobtitlefield,
    jobtitleError,
    companynamefield,
    companynameError,
    jobdeadlinefield,
    jobdeadlineError,
    companyemailfield,
    companyemailfieldError,
    jobdescriptioniframe,
    customemailtosendtouseriframe,
    jobRequirementDisplayDiv,
    jobRequirementError,
    urlTextInputField,
    saveJobdetailsResultDiv,
    saveJobdetailsResultContainer,
    jobDetailsEditorDiv,
    spinnerBorder,
    spinnerGrow,
    spanSaveJob,
  } = component.state.necessaryFields;

  const { job } = component.state;

  const jobtitle = jobtitlefield.value;
  const jobdescriptioniDoc = jobdescriptioniframe.contentDocument
    || jobdescriptioniframe.contentWindow.document;
  const customemailtosendtouserDoc = customemailtosendtouseriframe.contentDocument
    || customemailtosendtouseriframe.contentWindow.document;

  const jobdescriptionHtml = jobdescriptioniDoc.body.innerHTML;
  const customemailmsgtoapplicantHtml = customemailtosendtouserDoc.body.innerHTML;

  const companyname = companynamefield.value;
  const jobdeadline = jobdeadlinefield.value;
  const companyemail = companyemailfield.value;
  const jobrequirements = jobRequirementDisplayDiv.innerHTML;
  const applicationformurltmp = urlTextInputField.value;
  let isJobValid = false;

  /** setting up a isUrlRegistered variable depending on what is in the state */
  const { isUrlRegistered } = component.state;

  const applicationformurl = isUrlRegistered ? applicationformurltmp : '';

  if (jobtitle.length === 0) {
    jobtitleError.innerHTML = 'Enter the job title please!';
  } else if (jobdescriptionHtml.length === 0 || customemailmsgtoapplicantHtml.length === 0) {
    jobtitleError.innerHTML = '';
    isJobValid = false;
    jobRequirementError.innerHTML = `You cannot save a job which doesn't have a job description or an
     initial email to send to the applicants`;
  } else if (companyname.length === 0) {
    jobRequirementError.innerHTML = '';
    companynameError.innerHTML = 'Please enter your company name';
  } else if (jobdeadline.length === 0) {
    companynameError.innerHTML = '';
    jobdeadlineError.innerHTML = 'Select a deadline date or type it';
  } else if (!validator.isEmail(companyemail)) {
    jobdeadlineError.innerHTML = '';
    companyemailfieldError.innerHTML = 'Please enter a valid company-email';
  } else {
    isJobValid = true;
    const jobdescription = `<div>${jobdescriptionHtml}</div>`;
    const customemailmsgtoapplicant = `<div>${customemailmsgtoapplicantHtml}</div>`;
    const jobcreatoremail = getUserInfo().email;

    companyemailfieldError.innerHTML = '';

    /** SHOWING ANNIMATION WHILE WAITING FOR THE RESULT TO COME */
    spinnerGrow.forEach((currSpinner) => {
      currSpinner.classList.add('spinner-grow');
      currSpinner.classList.add('spinner-grow-sm');
      currSpinner.classList.add('text-warning');
    });
    spinnerBorder.classList.add('spinner-border');
    spinnerBorder.classList.add('spinner-border-sm');
    spinnerBorder.classList.add('text-warning');
    spanSaveJob.innerHTML = '<span class="text-17">Processing</span>';

    /** preparing a url */
    let isJobEditing = false;
    let job_id;
    let isJobFromTmp = false;
    if (job) {
      isJobEditing = true;
      job_id = job.job.job_id;
      isJobFromTmp = job.isJobFromTmp;
    } else {
      isJobEditing = false;
    }

    /** DATA TO SEND TO THE DATABASE */

    const datatosend = {
      job_id,
      jobtitle,
      jobdescription,
      customemailmsgtoapplicant,
      companyname,
      companyemail,
      jobcreatoremail,
      jobdeadline,
      jobrequirements,
      applicationformurl,
      isJobValid,
      isUrlRegistered,
      isJobEditing,
      isJobFromTmp,
    };

    axios.post('/jobs/add-or-edit-job', datatosend, { headers: getOauth() }).then((res) => {
      saveJobdetailsResultDiv.classList.remove('hidden-div');
      jobDetailsEditorDiv.classList.add('hidden-div');
      saveJobdetailsResultContainer.innerHTML = res.data;
    }).catch((err) => {
      saveJobdetailsResultDiv.classList.remove('hidden-div');
      saveJobdetailsResultContainer.innerHTML = err.response.data;
      jobDetailsEditorDiv.classList.add('hidden-div');
    });
  }
};

/** initializing job details editor */
export const handleJobDetailsEditorsInitialize = (component, necessaryFields, job) => {
  const {
    jobtitlefield,
    companynamefield,
    companyemailfield,
    jobdescriptioniframe,
    customemailtosendtouseriframe,
    jobRequirementInputField,
    jobRequirementDisplayDiv,
    urlTextInputField,
    jobDetailsEditorDiv,
    saveJobdetailsResultDiv,
    spinnerBorder,
    spinnerGrow,
    spanSaveJob,
  } = necessaryFields;

  /** SHOWING ANNIMATION WHILE WAITING FOR THE RESULT TO COME */
  spinnerBorder.classList.remove('spinner-border');
  spinnerBorder.classList.remove('spinner-border-sm');
  spinnerBorder.classList.remove('text-warning');
  spinnerGrow.forEach((currSpinner) => {
    currSpinner.classList.remove('spinner-grow');
    currSpinner.classList.remove('spinner-grow-sm');
    currSpinner.classList.remove('text-warning');
  });
  spanSaveJob.innerHTML = '<span class="text-17">Save job details</span';

  jobDetailsEditorDiv.classList.remove('hidden-div');
  saveJobdetailsResultDiv.classList.add('hidden-div');

  const jobdescriptioniDoc = jobdescriptioniframe.contentDocument
    || jobdescriptioniframe.contentWindow.document;
  const customemailtosendtouserDoc = customemailtosendtouseriframe.contentDocument
    || customemailtosendtouseriframe.contentWindow.document;

  job ? component.setState({ jobdeadline: new Date(getDateFromDateTime(job.job.job_deadline)) })
    : new Date();
  jobdescriptioniDoc.body.innerHTML = job ? job.job.job_description : '';
  customemailtosendtouserDoc.body.innerHTML = job ? job.job.custom_email_msg_to_applicants : '';
  jobtitlefield.value = job ? job.job.job_title : '';
  companynamefield.value = job ? job.job.company_name : '';
  companyemailfield.value = job ? job.job.company_email : '';
  jobRequirementInputField.value = '';
  jobRequirementDisplayDiv.innerHTML = job ? job.job.job_requirements : '';
  urlTextInputField.value = job ? job.job.application_form_url : '';
};

/**
 * ==============================================================================
 * ==============================================================================
 * ===============FUNCTIONS TO HANDLE SavingNewApplicationFormUrlInDb============
 * ==============================================================================
 * ==============================================================================
 * */
export const handleApplicationFormUrlTyping = (necessaryFields, component) => {
  const {
    urlTextInputField,
    urlCheckingDiv,
    urlCheckingResultSpan,
    urlCheckSpinnerHolderSpan,
  } = necessaryFields;
  const applicationformurl = urlTextInputField.value;
  if (applicationformurl.length !== 0) {
    urlCheckingDiv.classList.remove('hidden-div');
    urlCheckSpinnerHolderSpan.classList.remove('hidden-div');
    axios.post('/jobs/check-if-application-url-is-registered', { applicationformurl },
      { headers: getOauth() }).then((res) => {
      const result = res.data;
      urlCheckSpinnerHolderSpan.classList.add('hidden-div');
      urlCheckingResultSpan.innerHTML = result.info;
      if (result.isChecked) {
        if (result.resultsFromDb) {
          component.setState({ isUrlRegistered: true });
        } else {
          component.setState({ isUrlRegistered: false });
        }
      }
    }).catch((err) => {
      urlCheckSpinnerHolderSpan.classList.add('hidden-div');
      urlCheckingResultSpan.innerHTML = err.response.data;
    });
  } else {
    urlCheckingResultSpan.innerHTML = '';
    urlCheckingDiv.classList.add('hidden-div');
  }
};

/** saveApplicationUrl */
export const handleSaveApplicationFormUrlBtnClicked = (component) => {
  const {
    urlTextInputField,
    urlFormEditor,
    urlFormSaveResultsContainerDiv,
    urlCheckingDiv,
    urlCheckingResultSpan,
    urlResultsFromDb,
    urlCheckSpinnerHolderSpan,
  } = component.state.necessaryFields;
  const { isUrlRegistered } = component.state;
  const applicationformurl = urlTextInputField.value;

  if (applicationformurl.length !== 0) {
    urlCheckSpinnerHolderSpan.classList.remove('hidden-div');
    if (isUrlRegistered) {
      urlCheckSpinnerHolderSpan.classList.add('hidden-div');
      urlCheckingResultSpan.innerHTML = `<span class="text-danger">
      The url you want to save is already registered, please don't use it again</span>`;
    } else {
      axios.post('/jobs/add-new-application-form-url',
        { applicationformurl }, { headers: getOauth() }).then((res) => {
        const result = res.data;
        if (result.isSavedSuccess) {
          urlFormEditor.classList.add('hidden-div');
          urlFormSaveResultsContainerDiv.classList.remove('hidden-div');
          urlCheckingDiv.classList.add('hidden-div');
          urlResultsFromDb.innerHTML = result.info;
        } else {
          urlCheckSpinnerHolderSpan.classList.add('hidden-div');
          urlCheckingResultSpan.innerHTML = result.info;
        }
      }).catch((err) => {
        urlCheckSpinnerHolderSpan.classList.add('hidden-div');
        urlCheckingResultSpan.innerHTML = err.response.data.info;
      });
    }
  } else {
    urlTextInputField.classList.add('field-error');
  }
};

export const handleApplicationFormUrlEditorInitialize = (component) => {
  const {
    urlFormEditor,
    urlTextInputField,
    urlCheckingDiv,
    urlCheckingResultSpan,
    urlFormSaveResultsContainerDiv,
    urlResultsFromDb,
  } = component.state.necessaryFields;
  urlFormEditor.classList.remove('hidden-div');
  urlTextInputField.value = '';
  urlCheckingDiv.classList.add('hidden-div');
  urlCheckingResultSpan.innerHTML = '';
  urlFormSaveResultsContainerDiv.classList.add('hidden-div');
  urlResultsFromDb.innerHTML = '';
};


/**
 * =====================================================================
 * =====================================================================
 * =====================FUNCTIONS TO HANDLE ALL JOBS==========
 * =====================================================================
 * =====================================================================
 */
export const handleEditJobClicked = (component, job) => {
  component.props.history.push({
    pathname: '/create-or-edit-a-job',
    state: { job },
  });
};

/** handle single job clicked */
export const handleSingleJobClicked = (component, job) => {
  const {
    jobsListDiv,
    backToListDiv,
    jobDetailsDiv,
    jobDetailsHolderDiv,
  } = component.state.necessaryFields;
  jobsListDiv.classList.add('hidden-div');
  backToListDiv.classList.remove('hidden-div');
  jobDetailsDiv.classList.remove('hidden-div');

  /** creating editBtn */
  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit this job';
  editBtn.setAttribute('class', 'btn btn-sm btn-primary rounded-corners');
  editBtn.addEventListener('click', () => handleEditJobClicked(component, job));

  const jobDetails = `
  <div><h3>${job.job.job_title}</h3></div>

  <table class="table table-hover table-responsive">

    <tbody>
      <tr>
        <td><span>Job deadline : </span></td>
        <td><span>${getDateFromDateTime(job.job.job_deadline)}</span></td>
      </tr>
      <tr>
        <td><span>Company name : </span></td>
        <td><span>${job.job.company_name}</span></td>
      </tr>
      <tr>
        <td><span>Job description : </span></td>
        <td><span>${job.job.job_description}</span></td>
      </tr>
      <tr>
        <td><span>Job requirements : </span></td>
        <td> <span>${job.job.job_requirements}</span></td>
      </tr>
      <tr>
        <td><span>Application form url : </span></td>
        <td>
          <span>${job.job.application_form_url.length !== 0 ? job.job.application_form_url
    : '<span class="text-danger">No url found, click the edit</span>'}
        </td>
      </tr>
    </tbody>
  </table>
  
  `;
  jobDetailsHolderDiv.innerHTML = jobDetails;
  jobDetailsHolderDiv.appendChild(editBtn);
};

export const handleBackToListClickedFromJobDetails = (component) => {
  const {
    jobsListDiv,
    backToListDiv,
    jobDetailsDiv,
  } = component.state.necessaryFields;

  jobsListDiv.classList.remove('hidden-div');
  backToListDiv.classList.add('hidden-div');
  jobDetailsDiv.classList.add('hidden-div');
};
