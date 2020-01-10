/** IMPORTING STYLES */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../../styles/nezado-custom-styles.css';
import 'react-datepicker/dist/react-datepicker.min.css';

/** IMPORTING COMPONENTS */
import React from 'react';
import { Container, Row } from 'reactstrap';
import NavBar from './NavBar';
import SignupForm from './forms/SignupForm';

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          <SignupForm />
        </Row>
      </Container>
    </div>
  );
}

export default App;
