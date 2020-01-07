import { getDateFromDateTime } from '../../../../../../../helpers/functions/general-handlers';

export const handleOptionClicked = (necessaryFields) => {
  const {
    navbarContainer,
    brandLogo, optionsContainer,
  } = necessaryFields;

  navbarContainer.classList.add('bg-custom');
  navbarContainer.classList.remove('bg-unscrolled');
  brandLogo.classList.remove('brand-logo-lg');
  brandLogo.classList.add('brand-logo-sm');
  optionsContainer.classList.remove('navbar-options');
};
export const handleToggler = (component) => {
  const { isTogglerOpen } = component.state;
  component.setState({ isTogglerOpen: !isTogglerOpen });
};

/** JOB PROFILE */
export const handleDisplayJobProfile = (necessaryFields, job) => {
  const { jobDescriptionAndRequirementsDiv } = necessaryFields;
  const jobDetails = job.isJobRetrieved ? (`
  <div class="text-center color-rigth-grey-transparent border-darken-4 rounded-corners mb-2 width-98">
  <h3>${job.result[0].job_title} at ${job.result[0].company_name}</h3><br/><hr/>
  <span class="text-22">Job deadline : </span>
  <span class="text-17">${getDateFromDateTime(job.result[0].job_deadline)}</span><br/>
  <span class="text-22">Job description:</span>
  <span>${job.result[0].job_description}</span><br/>
  <span class="text-22">Job Requirements</span>
  <span>${job.result[0].job_requirements}</span><br/>
  </div>`) : job.result;
  jobDescriptionAndRequirementsDiv.innerHTML = jobDetails;
};

export const handleApplyForThisJobBtnClicked = (component) => {
  const {
    jobDetailsDiv, applicationDiv, goBackToJobDetailsDiv,
  } = component.state.fields;
  jobDetailsDiv.classList.add('hidden-div');
  applicationDiv.classList.remove('hidden-div');
  goBackToJobDetailsDiv.classList.remove('hidden-div');
};

export const handleGoBackToJoDetailsClicked = (component) => {
  const {
    jobDetailsDiv, applicationDiv, goBackToJobDetailsDiv, feedBackDiv,
  } = component.state.fields;
  jobDetailsDiv.classList.remove('hidden-div');
  applicationDiv.classList.add('hidden-div');
  goBackToJobDetailsDiv.classList.add('hidden-div');
  feedBackDiv.classList.add('hidden-div');
};
