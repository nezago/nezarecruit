/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Row,
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Input,
  Button,
} from 'reactstrap';
import { handleLoginEmailTyping, handleSubmitLoginForm } from '../helpers/functions/handlers';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTogglerOpen: false,
    };
  }

  componentDidMount() {
    const necessaryFields = {
      emailField: document.getElementById('login-email'),
      passwordField: document.getElementById('password'),
      errorField: document.getElementById('errorField'),
      loginBtn: document.getElementById('login-btn'),
    };
    this.setState({ necessaryFields });
  }

  handleToggler = () => {
    const { isTogglerOpen } = this.state;
    this.setState({ isTogglerOpen: !isTogglerOpen });
  }

  render() {
    const { isTogglerOpen } = this.state;
    return (
      <div>
        <Navbar dark expand="md" className="bg-custom sticky-element">
          <NavbarBrand href="/">NezaRecruit</NavbarBrand>
          <NavbarToggler onClick={this.handleToggler} />
          <Collapse
            isOpen={isTogglerOpen}
            navbar
            className="text-white"
          >
            <Nav className="form-inline ml-auto" navbar>
              <Row>
                <div className="col-md-12">
                  <div>
                    <span id="errorField" className="text-danger text-12 col-md-2" />
                    <Input
                      type="text"
                      placeholder="email"
                      className="rounded-corners form-control-sm col-md-4"
                      required
                      id="login-email"
                      onChange={() => handleLoginEmailTyping(this)}
                    />
                    <Input
                      type="password"
                      placeholder="password"
                      className="rounded-corners form-control-sm col-md-4"
                      required
                      id="password"
                    />
                    <Button
                      type="button"
                      className="btn-success rounded-corners btn-sm col-md-2"
                      id="login-btn"
                      onClick={() => handleSubmitLoginForm(this)}
                    >
                      Enter
                    </Button>
                  </div>
                </div>
              </Row>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
