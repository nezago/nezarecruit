import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../../styles/nezado-custom-styles.css';
import NavBar from './NavBar';
import DefaultHomepage from './DefaultHomepage';

function App() {
  return (
    <div>
      <Router>
        <Route>
          <NavBar />
          <DefaultHomepage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
