/** IMPORTING STYLES */
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../../styles/nezado-custom-styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';

/** OTHER IMPORTING */
import { HashRouter as Router, Route } from 'react-router-dom';

/** IMPORTING COMPONENTS */
import React from 'react';
import NavBar from './NavBar';
import ManageApplicationsLayout from './layouts/ManageApplicationsLayout';
import ManageApplicantEmailsLayout from './layouts/ManageApplicantEmailsLayout';
import ManageHomepageLayout from './layouts/ManageHomepageLayout';
import CreateOrEditJobLayout from './layouts/CreateOrEditJobLayout';
import LoggedInUserProfileLayout from './layouts/LoggedInUserProfileLayout';
import ManageUnlinkedJobs from './layouts/ManageUnlinkedJobs';
import SavingNewApplicationFormUrlInDb from './layouts/SavingNewApplicationFormUrlInDb';
import ManageActiveJobs from './layouts/ManageActiveJobs';
import DefaultLoginHomepage from './layouts/DefaultLoginHomepage';

function App() {
  return (
    <div>
      <Router>
        <Route>
          <NavBar />
          <div className="mt-5" />
          <Route
            exact
            path="/"
            component={DefaultLoginHomepage}
          />
          <Route
            exact
            path="/manage-all-applications"
            component={ManageApplicationsLayout}
          />
          <Route
            exact
            path="/manage-all-applicants-e-mails"
            component={ManageApplicantEmailsLayout}
          />
          <Route
            exact
            path="/manage-homepage"
            component={ManageHomepageLayout}
          />
          <Route
            exact
            path="/create-or-edit-a-job"
            component={CreateOrEditJobLayout}
          />
          <Route
            exact
            path="/manage-unlinked-jobs"
            component={ManageUnlinkedJobs}
          />
          <Route
            exact
            path="/manage-all-active-jobs"
            component={ManageActiveJobs}
          />
          <Route
            exact
            path="/save-new-application-form-url"
            component={SavingNewApplicationFormUrlInDb}
          />

          <Route
            exact
            path="/user-profile/:userfname"
            component={LoggedInUserProfileLayout}
          />
        </Route>
      </Router>
    </div>

  );
}

export default App;
