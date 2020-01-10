/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import {
  handleIdCardNumberTyping,
  handleClickHereToSignupBtnClicked,
  handlePasswordTyping,
  handlePasswordBlur,
  handleConfirmPasswordTyping,
  handleEmailTyping,
  handleEmailBlur,
} from '../../helpers/functions/handlers';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateofbirth: new Date('2000-05-01'),
    };
  }

  componentDidMount() {
    const inputFields = {
      dateInput: document.getElementById('dateOfBirth'),
      fnameError: document.getElementById('fnameError'),
      dobError: document.getElementById('dobError'),
      emailField: document.getElementById('email'),
      emailError: document.getElementById('emailError'),
      passwordField: document.getElementById('password'),
      passwordError: document.getElementById('passwordError'),
      confirmpasswordField: document.getElementById('confirmpassword'),
      confirmpasswordError: document.getElementById('confirmpasswordError'),
      checkIdCardNumberDiv: document.getElementById('check-id-card-number-div'),
      applicationFromContainerDiv: document.getElementById('application-container'),
      idCardNumberInputField: document.getElementById('id-card-input-field'),
      resultDivHolder: document.getElementById('result-div-holder'),
      lockedBtn: document.getElementById('locked-btn'),
      unlockedBtn: document.getElementById('unlocked-btn'),
    };
    this.setState({ inputFields });
  }

  handleSelectDateOfBirth = (date) => {
    this.setState({ dateofbirth: date });
  }

  render() {
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
                id="locked-btn"
                disabled
              >
                <span className="text-22 mr-2" id="span-locked">
                  <FaLock />
                  <FaLock />
                  <FaLock />
                </span>
                <span className="text-22" id="span-locked-info-holder">Signup form is Locked</span>
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm btn-block rounded-corners hidden-div"
                id="unlocked-btn"
                onClick={() => handleClickHereToSignupBtnClicked(this)}
              >
                <span className="text-22" id="span-locked-info-holder">Click Here to signup</span>
                <span className="text-22 ml-2" id="span-unlocked">
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
            className="col-md-8 application-form"
          >
            <div>
              <h3 className="text-center text-success">Complete your registration</h3>
              <hr />

              {/** COMPNY NAME PORTION */}
              <div>
                <label className="form-group form-row" htmlFor="companyname">
                  <span className="col-md-4 hand-cursor">Your Company Name</span>
                  <input
                    type="text"
                    placeholder="Eg.: NezaGo Inc."
                    id="companyname"
                    className="form-control form-control-sm rounded-corners col-md-8"
                  />
                </label>
                <div id="companynameError" className="text-danger text-15 text-center" />
              </div>

              {/** DATE OF BIRTH PORTION */}
              <div>
                <label className="form-group form-row" htmlFor="dateofbirth">
                  <span className="col-md-4 hand-cursor">Your Birthday</span>
                  <div className="form-control form-control-sm rounded-corners text-center col-md-8">
                    <DatePicker
                      selected={this.state.dateofbirth}
                      dateFormat="yyyy-MM-dd"
                      className="form-control form-control-sm"
                      onChange={this.handleSelectDateOfBirth}
                      id="dateofbirth"
                    />
                  </div>
                </label>
                <div id="dateofbirthError" className="text-danger text-15" />
              </div>

              {/** EMAIL PORTION */}
              <div>
                <label className="form-group form-row" htmlFor="email">
                  <span className="col-md-4 hand-cursor">Your Email</span>
                  <input
                    className="form-control form-control-sm rounded-corners col-md-8"
                    type="text"
                    id="email"
                    placeholder="Eg.: example@nezago.com"
                    onChange={() => handleEmailTyping(this)}
                    onBlur={() => handleEmailBlur(this)}
                  />
                </label>
                <div id="emailError" className="text-danger text-15 text-center" />
              </div>

              {/** PASSWORD PORTION */}
              <div>
                <label className="form-group form-row" htmlFor="password">
                  <span className="col-md-4 hand-cursor">Choose a password</span>
                  <input
                    className="form-control form-control-sm rounded-corners col-md-8"
                    type="password"
                    id="password"
                    placeholder="Eg.: myp3a$$%sSwoRD"
                    onChange={() => handlePasswordTyping(this)}
                    onBlur={() => handlePasswordBlur(this)}
                  />
                </label>
                <div id="passwordError" className="text-danger text-15 text-center mb-2" />
              </div>

              {/** CONFIRM PASSWORD PORTION */}
              <div>
                <label className="form-group form-row" htmlFor="confirmpassword">
                  <span className="col-md-4 hand-cursor">Confirm password</span>
                  <input
                    className="form-control form-control-sm rounded-corners col-md-8"
                    type="password"
                    id="confirmpassword"
                    placeholder="Eg.: myp3a$$%sSwoRD"
                    onChange={() => handleConfirmPasswordTyping(this)}
                  />
                </label>
                <div id="confirmpasswordError" className="text-danger text-15 text-center" />
              </div>
              <div>
                <button
                  type="button"
                  className="col-md-12 btn btn-block btn-info btn-sm rounded-corners"
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

export default SignupForm;
