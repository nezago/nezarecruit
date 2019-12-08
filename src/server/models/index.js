import { addNewUserToDb, checkIfEmailExistFromTableUsers, userLogin } from './users-model';
import { addApplicationForm, checkEmailFromApplicationsAndUsers, getAllApplications } from './apply-models';

export default {
  addNewUserToDb,
  checkIfEmailExistFromTableUsers,
  userLogin,
  addApplicationForm,
  checkEmailFromApplicationsAndUsers,
  getAllApplications,
};
