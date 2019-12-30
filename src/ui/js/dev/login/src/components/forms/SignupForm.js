/* eslint-disable react/no-unused-state */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitNewUser } from '../../actions/sendDataToDb';
import { checkEmailFromTableUsers } from '../../actions/retrieveDataFromDb';
import {
  handleTyping,
  handleFnameTyping,
  handleSubmitSignupForm,
  handleEmailTyping,
  handlePasswordTyping,
  handleConfirmPasswordTyping,
} from '../../helpers/functions/handlers';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      midname: '',
      lname: '',
      email: '',
      date: new Date('1999-12-01'),
      password: '',
      confirmpassword: '',
    };
    this.props = {
      submitNewUser: PropTypes.func.isRequired,
      checkEmailFromTableUsers: PropTypes.func.isRequired,
      dataFromDb: PropTypes.object.isRequired,
    };
  }

  componentDidMount() {
    const dateInput = document.getElementById('dateOfBirth');
    const fnameError = document.getElementById('fnameError');
    const dobError = document.getElementById('dobError');
    const emailError = document.getElementById('emailError');
    const passwordField = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const confirmpasswordField = document.getElementById('confirmpassword');
    const confirmpasswordError = document.getElementById('confirmpasswordError');
    let inputFields;

    if (dateInput && fnameError && dobError && emailError && passwordField && passwordError
      && confirmpasswordField && confirmpasswordError) {
      inputFields = {
        dateInput,
        fnameError,
        dobError,
        emailError,
        passwordField,
        passwordError,
        confirmpasswordField,
        confirmpasswordError,
      };
    }
    this.setState({ inputFields });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { dataFromDb } = nextProps;
      if (dataFromDb) {
        const { isEmailExistsFromUsers } = dataFromDb;
        const emailError = document.getElementById('emailError');
        if (!isEmailExistsFromUsers) {
          emailError.innerHTML = '';
          this.setState({ email: document.getElementById('email').value });
        } else {
          emailError.innerHTML = 'This email is already taken by another user!';
        }
      }
    }
  }

  dateOfBirthSelect = (date) => {
    this.setState({ date });
  }

  render() {
    const {
      midname, lname, date, inputFields,
    } = this.state;
    const { submitNewUser: submitFunc, checkEmailFromTableUsers: checkFunc } = this.props;
    return (
      <Container>

        <Row
          id="applicationFormDiv"
          className="shadows mb-5 mt-5 width-98 text-white black-bordered-element black-transparent-element rounded-corners padding-15"
        >
          <div className="col-md-4 application-form">
            <div>
              <h3 className="text-center text-success">Register</h3>

              <div className="form-group form-row">
                <label
                  htmlFor="fname"
                  className="col-md-4 hand-cursor"
                >
                  Family name :
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="eg.: KAMIKAZI"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handleFnameTyping(event, this, inputFields)}
                />
              </div>
              <div className="text-center text-danger">
                <span id="fnameError" />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="midname"
                  className="col-md-4 hand-cursor"
                >
                  Middle name :
                </label>
                <input
                  type="text"
                  name="midname"
                  id="midname"
                  placeholder="eg.: Anne"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handleTyping(event, this)}
                  value={midname}
                />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="lname"
                  className="col-md-4 hand-cursor"
                >
                  Last name :
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="eg.: Maria"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handleTyping(event, this)}
                  value={lname}
                />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="dateOfBirth"
                  className="col-md-4 hand-cursor"
                >
                  Date of birth :
                </label>
                <div className="col-md-8 form-control form-control-sm rounded-corners text-center">
                  <DatePicker
                    selected={date}
                    dateFormat="yyyy-MM-dd"
                    id="dateOfBirth"
                    className="form-control form-control-sm"
                    onChange={this.dateOfBirthSelect}
                  />
                </div>
              </div>
              <div>
                <span id="dobError" />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="email"
                  className="col-md-4 hand-cursor"
                >
                  Email :
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="eg.: you@nezado.com"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handleEmailTyping(event, inputFields, checkFunc)}
                />
              </div>
              <div className="text-center text-danger">
                <span id="emailError" />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="password"
                  className="col-md-4 hand-cursor"
                >
                  Password :
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="eg.: mypassword"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handlePasswordTyping(event, this, inputFields)}
                />
              </div>
              <div className="text-center text-danger">
                <span id="passwordError" />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="confirmpassword"
                  className="col-md-4 hand-cursor"
                >
                  Confirm Password :
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="eg.: myconfirmpassword"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handleConfirmPasswordTyping(event, this, inputFields)}
                />
              </div>
              <div className="text-center text-danger">
                <span id="confirmpasswordError" />
              </div>
              <div>
                <button
                  type="button"
                  className="col-md-12 btn btn-block btn-info btn-sm rounded-corners"
                  onClick={
                    () => handleSubmitSignupForm(this, inputFields, submitFunc)
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  dataFromDb: state.myReducers,
});

export default connect(mapStateToProps,
  { checkEmailFromTableUsers, submitNewUser })(SignupForm);
