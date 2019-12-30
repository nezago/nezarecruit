import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../../styles/nezado-custom-styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import { Provider } from 'react-redux';
import NavBar from './NavBar';
import SoftwareDevFormApply from './forms/SoftwareDevFormApply';
import store from '../store';
import HomepageContainer from './containers/HomepageContainer';


function App() {
  return (
    <div className="index-background">
      <Provider store={store}>
        <Router>
          <Route>
            <NavBar />
            <Route
              exact
              path="/"
              component={HomepageContainer}
            />
            <Route
              exact
              path="/apply-for-junior-software-developer"
              component={SoftwareDevFormApply}
            />
          </Route>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
