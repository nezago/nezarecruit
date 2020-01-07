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
  addNewApplicationFormUrl,
  getAllApplicationFormUrls,
  checkIfApplicationFormUrlIsRegistered,
  addOrEditJob,
  getAllJobs,
  getParticularJob,
} from './job-models';

import {
  addNewUserLog,
  getAllUsersLogs,
  getUserLogByUserId,
  getUserLogByLogId,
  getUserLogByDates,
  getUserLogByDatesAndUserId,
} from './user-logs-models';

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
  addNewApplicationFormUrl,
  getAllApplicationFormUrls,
  checkIfApplicationFormUrlIsRegistered,
  addOrEditJob,
  getAllJobs,
  getParticularJob,
  addNewUserLog,
  getAllUsersLogs,
  getUserLogByUserId,
  getUserLogByLogId,
  getUserLogByDates,
  getUserLogByDatesAndUserId,
};
