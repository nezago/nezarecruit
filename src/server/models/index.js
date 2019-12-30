import {
  addNewUserToDb,
  checkIfEmailExistFromTableUsers,
  userLogin,
} from './users-model';
import {
  addApplicationForm,
  checkEmailFromApplicationsAndUsers,
  getAllApplications,
  updateReadInTableApplications,
  updateRepliedInTableApplications,
  getUnsentEmailAddress,
  sendEmail,
  getAllSentEmails,

} from './apply-models';

import {
  addNewManageHomepage,
  getAllManages,
} from './manage-homepage-model';

import {
  addNewJob,
  getAllJobs,
} from './job-models';

export default {
  addNewUserToDb,
  checkIfEmailExistFromTableUsers,
  userLogin,
  addApplicationForm,
  checkEmailFromApplicationsAndUsers,
  getAllApplications,
  updateReadInTableApplications,
  getUnsentEmailAddress,
  updateRepliedInTableApplications,
  sendEmail,
  getAllSentEmails,
  addNewManageHomepage,
  getAllManages,
  addNewJob,
  getAllJobs,
};
