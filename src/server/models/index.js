import { addNewUserToDb, checkIfEmailExistFromTableUsers, userLogin } from './users-model';
import { addApplicationForm, checkEmailFromApplicationsAndUsers } from './apply-models';

export default {
  addNewUserToDb,
  checkIfEmailExistFromTableUsers,
  userLogin,
  addApplicationForm,
  checkEmailFromApplicationsAndUsers,
};
