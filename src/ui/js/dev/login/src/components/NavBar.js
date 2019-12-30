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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitLoginForm } from '../actions/sendDataToDb';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTogglerOpen: false,
      email: '',
      password: '',
    };
    this.props = {
      submitLoginForm: PropTypes.func.isRequired,
      dataFromDb: PropTypes.object.isRequired,
    };
  }

  handleToggler = () => {
    const { isTogglerOpen } = this.state;
    this.setState({ isTogglerOpen: !isTogglerOpen });
  }

  handleTyping = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmitTheForm = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email.length !== 0) {
      if (password.length !== 0) {
        const loginInfo = { email, password };
        this.props.submitLoginForm(loginInfo);
      } else {
        console.log('Enter password!');
      }
    } else {
      console.log('Enter Email');
    }
  }

  render() {
    const { isTogglerOpen, email, password } = this.state;
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
                    <Input
                      type="text"
                      placeholder="email"
                      className="rounded-corners form-control-sm col-md-5"
                      required
                      name="email"
                      onChange={this.handleTyping}
                      value={email}
                    />
                    <Input
                      type="password"
                      placeholder="password"
                      className="rounded-corners form-control-sm col-md-5"
                      required
                      name="password"
                      onChange={this.handleTyping}
                      value={password}
                    />
                    <Button
                      type="button"
                      className="btn-success rounded-corners btn-sm col-md-2"
                      onClick={this.handleSubmitTheForm}
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

const mapStateToProps = (state) => ({
  dataFromDb: state.myReducers,
});

export default connect(mapStateToProps, { submitLoginForm })(NavBar);
