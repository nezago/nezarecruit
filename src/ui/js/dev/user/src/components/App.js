/** IMPORTING STYLES */
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../../styles/nezado-custom-styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';

/** OTHER IMPORTING */
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

/** IMPORTING COMPONENTS */
import React from 'react';
import store from '../store';
import NavBar from './NavBar';
import ManageApplicationsLayout from './layouts/ManageApplicationsLayout';
import ManageApplicantEmailsLayout from './layouts/ManageApplicantEmailsLayout';
import ManageHomepageLayout from './layouts/ManageHomepageLayout';
import CreateJobLayout from './layouts/CreateJobLayout';
import LoggedInUserProfileLayout from './layouts/LoggedInUserProfileLayout';
import ManageUnhandledJobs from './layouts/ManageUnhandledJobs';
import SavingNewApplicationFormUrlInDb from './layouts/SavingNewApplicationFormUrlInDb';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Route>
            <NavBar />
            <div className="mt-5" />
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
              path="/create-a-job"
              component={CreateJobLayout}
            />
            <Route
              exact
              path="/manage-unhandled-jobs"
              component={ManageUnhandledJobs}
            />
            <Route
              exact
              path="/user-profile"
              component={LoggedInUserProfileLayout}
            />
            <Route
              exact
              path="/save-new-application-form-url"
              component={SavingNewApplicationFormUrlInDb}
            />
          </Route>
        </Router>
      </Provider>
    </div>

  );
}

export default App;
