/** Date and times */
export const getCurrentYear = () => new Date().getFullYear();
export const getCurrentMonth = () => { };

export const getDateFromDateTime = (datetime) => datetime.split('T')[0];
export const getTimeFromDateTime = (datetime) => (datetime.split('T')[1]).split('.')[0];

/** handlers */
export const handleSingleApplicantClicled = (event, application, necessaryFields) => {
  const { allResultDiv, applicantDetails, backToListBtn } = necessaryFields;
  if (event.target.tagName !== 'BUTTON') {
    allResultDiv.classList.add('hidden-div');
    applicantDetails.classList.remove('hidden-div');
    backToListBtn.classList.remove('hidden-div');
    applicantDetails.innerHTML = (`
  <div class="color-grey-transparent">
    <div>
      <h1 class="text-center">
        <span>${application.fname}</span>
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
        <span class="float-right">${application.email}</span>
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

export const handleBackToListClicked = (necessaryFields) => {
  const {
    allResultDiv, applicantDetails, backToListBtn, emailingDiv,
  } = necessaryFields;
  allResultDiv.classList.remove('hidden-div');
  applicantDetails.classList.add('hidden-div');
  backToListBtn.classList.add('hidden-div');
  emailingDiv.classList.add('hidden-div');
};

export const handleCloseSingleResultClicked = (event) => {
  const allDivs = document.querySelectorAll('div');
  const currentId = event.target.id;
  allDivs.forEach((currDiv) => {
    if (currDiv.id === currentId) {
      currDiv.classList.add('hidden-div');
    }
  });
};

export const handleEmailBtnClicked = (necessaryFields) => {
  const { emailingDiv } = necessaryFields;
  emailingDiv.classList.remove('hidden-div');
  window.scrollBy(0, 700);
};
