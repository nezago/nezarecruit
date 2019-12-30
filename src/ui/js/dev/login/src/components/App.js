/** IMPORTING STYLES */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../../styles/nezado-custom-styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';

/** OTHER IMPORTING */
import { Provider } from 'react-redux';

/** IMPORTING COMPONENTS */
import React from 'react';
import { Container, Row } from 'reactstrap';
import store from '../store';
import NavBar from './NavBar';
import SignupForm from './forms/SignupForm';

function App() {
  return (
    <div>
      <Provider store={store}>
        <NavBar />
        <Container>
          <Row>
            <SignupForm />
          </Row>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
