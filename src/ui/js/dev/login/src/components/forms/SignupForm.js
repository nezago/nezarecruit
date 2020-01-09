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
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { submitNewUser } from '../../actions/sendDataToDb';
import { checkEmailFromTableUsers } from '../../actions/retrieveDataFromDb';
import {
  handleTyping,
  handleFnameTyping,
  handleSubmitSignupForm,
  handleEmailTyping,
  handlePasswordTyping,
  handleConfirmPasswordTyping,
  handleIdCardNumberTyping,
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
    const inputFields = {
      dateInput: document.getElementById('dateOfBirth'),
      fnameError: document.getElementById('fnameError'),
      dobError: document.getElementById('dobError'),
      emailError: document.getElementById('emailError'),
      passwordField: document.getElementById('password'),
      passwordError: document.getElementById('passwordError'),
      confirmpasswordField: document.getElementById('confirmpassword'),
      confirmpasswordError: document.getElementById('confirmpasswordError'),
      checkIdCardNumberDiv: document.getElementById('check-id-card-number-div'),
      idCardNumberInputField: document.getElementById('id-card-input-field'),
      resultDivHolder: document.getElementById('result-div-holder'),
      unlockSignupFormBtn: document.getElementById('unlock-signup-form-btn'),
      spanLocked: document.getElementById('span-locked'),
      spanUnlocked: document.getElementById('span-unlocked'),
      spanLockInfoHolder: document.getElementById('span-locked-info-holder'),
    };
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

          {/** CHECKING FIRST IF THE USER IS ALLOWED TO SIGNUP */}
          <div
            className="p-5 rounded-corners color-grey-transparent heigth-40 width-60 centered-div"
            id="check-id-card-number-div"
          >
            <div className="form-group form-row mb-2">
              <input
                type="text"
                id="id-card-input-field"
                className="form-control form-control-lg col-md-12 rounded-corners"
                placeholder="Enter your ID Card number here"
                onChange={() => handleIdCardNumberTyping(this)}
              />
            </div>
            <div
              className=" color-black p-5 mb-2 rounded-corners text-center"
              id="result-div-holder"
            >
              <h3>Your Id card is your key to unlock the Signup form</h3>

            </div>
            <div className="mb-2 form-group form-row">
              <button
                type="button"
                className="btn btn-danger btn-sm btn-block rounded-corners"
                id="unlock-signup-form-btn"
                disabled
              >
                <span className="text-22 mr-2" id="span-locked">
                  <FaLock />
                  <FaLock />
                  <FaLock />
                </span>
                <span className="text-22" id="span-locked-info-holder">Signup form is Locked</span>
                <span className="text-22 ml-2 hidden-div" id="span-unlocked">
                  <FaLockOpen />
                  <FaLockOpen />
                  <FaLockOpen />
                </span>
              </button>
            </div>
          </div>

          {/** APPLICATION FORM */}
          <div
            id="application-container"
            className="col-md-4 application-form hidden-div"
          >
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
