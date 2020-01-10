/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  displayUserAuthorities,
  handleUserfnameTyping,
  handleUserfnameBlur,
  handleUserIdCardNumberTyping,
  handleUserIdCardNumberBlur,
  handleSelectUserAuthoritiesBlur,
  handleSaveIdCardNumberBtnClicked,
  idCardEditorInitialize,
} from '../../helpers/functions/handlers';

class RegisterUserIdCardNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const necessaryFields = {
      userfnameField: document.getElementById('userfname'),
      userfnameErrorSpan: document.getElementById('userfnameErrorSpan'),
      usermidanameField: document.getElementById('usermidname'),
      userlnameField: document.getElementById('userlname'),
      useridcarnumberField: document.getElementById('useridcardnumber'),
      idCardErrorSpan: document.getElementById('idCardErrorSpan'),
      userauthoritiesSelectField: document.getElementById('userauthorities'),
      userauthoritiesErrorSpan: document.getElementById('userauthoritiesErrorSpan'),
      idcardnumberResultContainerDiv: document.getElementById('id-card-number-results-container'),
      idcardnumberResultHolderDiv: document.getElementById('id-card-number-results-holder'),
      saveIdCardInDbBtn: document.getElementById('save-id-card-no-in-db-btn'),
      spanSpinnerGrow: document.querySelectorAll('span#spinner-grow'),
      spanSpinnerBorder: document.getElementById('spinner-border'),
      saveIdCardNumberSpanInBtn: document.getElementById('save-id-card-number-span-in-btn'),
      idCardFormDiv: document.getElementById('id-card-form'),
    };
    this.setState({ necessaryFields });
    displayUserAuthorities(necessaryFields);
    idCardEditorInitialize(necessaryFields, this);
  }

  render() {
    return (
      <div className="color-grey-transparent width-80 rounded-corners heigth-80 white-bordered-element-1 centered-div p-5">
        <div className="width-60 white-bordered-element-1 p-5 color-rigth-grey-transparent rounded-corners">
          <div id="id-card-div">
            <div id="id-card-form">
              <h3 className="text-center text-success">Register ID Card number here</h3>
              <hr />
              <label htmlFor="userfname" className="form-group form-row">
                <span className="col-md-4 hand-cursor">User First name : </span>
                <input
                  type="text"
                  id="userfname"
                  placeholder="Eg.: KAMIKAZI"
                  className="form-control form-control-sm rounded-corners col-md-8"
                  onBlur={() => handleUserfnameBlur(this)}
                  onChange={() => handleUserfnameTyping(this)}
                />
              </label>
              <div className="text-danger text-10 text-center">
                <span id="userfnameErrorSpan" />
              </div>

              {/** user midname portion */}
              <label htmlFor="usermidname" className="form-group form-row">
                <span className="col-md-4 hand-cursor">User middle name : </span>
                <input
                  type="text"
                  id="usermidname"
                  placeholder="Eg.: Marie"
                  className="form-control form-control-sm rounded-corners col-md-8"
                />
              </label>

              {/** user lname portion */}
              <label htmlFor="userlname" className="form-group form-row">
                <span className="col-md-4 hand-cursor">User Last name : </span>
                <input
                  type="text"
                  id="userlname"
                  placeholder="Eg.: Jeanne"
                  className="form-control form-control-sm rounded-corners col-md-8"
                />
              </label>

              {/** user idcard number portion */}
              <label htmlFor="useridcardnumber" className="form-group form-row">
                <span className="col-md-4 hand-cursor">User ID Card No : </span>
                <input
                  type="text"
                  id="useridcardnumber"
                  placeholder="Eg.: 1199980123456789"
                  className="form-control form-control-sm rounded-corners col-md-8"
                  onBlur={() => handleUserIdCardNumberBlur(this)}
                  onChange={() => handleUserIdCardNumberTyping(this)}
                />
              </label>
              <div className="text-danger text-10 text-center mb-2">
                <span id="idCardErrorSpan" />
              </div>

              {/** user-authorities */}
              <label htmlFor="userauthorities" className="form-group form-row">
                <span className="col-md-4 hand-cursor">Select User Authorities : </span>
                <select
                  id="userauthorities"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                  onBlur={() => handleSelectUserAuthoritiesBlur(this)}
                >
                  <option value="">---Select a user-authorities here---</option>
                </select>
              </label>
              <div className="text-danger text-10 text-center mb-2">
                <span id="userauthoritiesErrorSpan" />
              </div>

              {/** user-authorities */}
              <label htmlFor="userstatus" className="form-group form-row">
                <span className="col-md-4 hand-cursor">User status : </span>
                <select
                  id="userstatus"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                  onBlur={() => handleSelectUserAuthoritiesBlur(this)}
                >
                  <option value="">---Select a user status here---</option>
                  <option value="true">Active</option>
                  <option value="false">Not Active</option>
                </select>
              </label>
              <div className="text-danger text-10 text-center mb-2">
                <span id="userauthoritiesErrorSpan" />
              </div>

              {/** save btn portion */}
              <button
                type="button"
                className="rounded-corners btn btn-sm btn-block btn-primary"
                id="save-id-card-no-in-db-btn"
                onClick={() => handleSaveIdCardNumberBtnClicked(this)}
              >
                <span id="spinner-border" />
                <span id="save-id-card-number-span-in-btn">Hit this button to save</span>
                <span id="spinner-grow" />
                <span id="spinner-grow" />
                <span id="spinner-grow" />
              </button>
            </div>

            {/** showing result from the database */}
            <div id="id-card-number-results-container" className="hidden-div">
              <div id="id-card-number-results-holder" className="color-white p-5 rounded-corners" />
              <div id="form-group-form-row">
                <button
                  type="button"
                  onClick={() => idCardEditorInitialize(this.state.necessaryFields, this)}
                  className="col-md-6 btn btn-primary btn-sm rounded-corners"
                >
                Register an other id card number
                </button>
                <button
                  type="button"
                  className="col-md-6 btn btn-danger btn-sm rounded-corners"
                >
                Go back tou your profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUserIdCardNumber;
