/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { FaReply, FaReplyAll, FaReplyd } from 'react-icons/fa';
import axios from 'axios';
import {
  getCurrentYear,
  handleSingleApplicantClicled,
  handleBackToListClicked,
  handleCloseSingleResultClicked,
  handleEmailBtnClicked,
  handleKeyPressWhileTypingEmailMessage,
} from '../../helpers/functions/handlers';

class ManageApplicationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { applicationsArr: [] };
  }

  componentDidMount() {
    const token = localStorage.getItem('oauth');
    axios.get('/applications/get-all-applications',
      { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      const applicationsArr = res.data;
      this.setState({ applicationsArr });
    });
  }

  render() {
    const { applicationsArr } = this.state;
    const necessaryFields = {
      allResultDiv: document.getElementById('all-results-div'),
      applicantDetails: document.getElementById('applicant-details'),
      backToListBtn: document.getElementById('back-to-list-btn'),
      emailingDiv: document.getElementById('emailing-div'),
      recipientEmail: document.getElementById('recipient-email'),
      recipientFname: document.getElementById('recipient-fname'),
      emailMsg: document.getElementById('email-msg'),
      emailMsgPreview: document.getElementById('email-msg-preview'),
    };
    let applicationsList;
    if (applicationsArr.length !== 0) {
      applicationsList = applicationsArr.map((application) => (
        <div
          key={application.application_id}
          id={application.application_id}
          className="color-rigth-grey-transparent mt-2 p-2 rounded-corners hand-cursor"
          onClick={
            () => handleSingleApplicantClicled(event, application, necessaryFields)
          }
        >
          <span className="fname-span text-22 text-bold mr-2">
            Family name :
            {' '}
            {application.fname}
          </span>
          <span className="text-19 text-green mr-2 text-bold">
            Age :
            {getCurrentYear() - application.year_of_birth}
            {' '}
            years old
          </span>
          <span className="text-19 text-white mr-2 text-bold">
            {application.education_level}
          </span>

          <span className="text-italic text-17 text-blue">
            E-mail :
            {application.email}
          </span>

          <span className="float-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-corners hand-cursor"
              id={application.application_id}
              onClick={() => handleCloseSingleResultClicked(event, application, this)}
            >
              &times;

            </button>
          </span>
        </div>
      ));
    }

    return (
      <div className="color-dark-purple h-100 position-absolute-top-left w-100 mt-5">
        {/** LEFT-SIDE BAR */}
        <div className=" aside-bar position-absolute-top-left text-white h-100">
          <ul className="nav flex-column mr-auto">
            <li className="nav-item hand-cursor mt-5 active-tab color-dark-purple">
              <p className="text-50">
                <FaReply />
              </p>
              <span> All</span>
            </li>
            <li className="nav-item hand-cursor mt-5">
              <p className="text-50">
                <FaReplyAll />
              </p>
              <span>UnReplied</span>
            </li>
            <li className="nav-item hand-cursor mt-5">
              <p className="text-50">
                <FaReplyd />
              </p>
              <span>Replied</span>
            </li>
          </ul>
        </div>

        {/** SHOWING APPLICANTS LIST */}
        <div
          className="mt-5 heigth-80 overflow-auto width-80 color-grey-transparent p-2"
          id="all-results-div"
        >
          {applicationsList}
        </div>

        {/** OPTIONS PORTION */}
        <div id="back-to-list-btn" className="position-fixed-top-right hidden-div">
          <button
            type="button"
            className="btn btn-sm btn-info rounded-corners"
            onClick={() => handleBackToListClicked(necessaryFields)}
          >
            Go back to list
          </button>
          <button
            className="btn btn-block btn-sm btn-primary rounded-corners"
            type="button"
            onClick={() => handleEmailBtnClicked(necessaryFields)}
          >
            Send Email
          </button>
        </div>

        {/** SHOWING ALL DETAILS */}
        <div
          className="mt-5 heigth-80 overflow-auto width-80 color-grey-transparent p-2 hidden-div"
          id="applicant-details"
        />

        {/** SEND EMAIL PORTION */}
        <div
          id="emailing-div"
          className="mt-5 heigth-80 overflow-auto width-80 color-dark-purple p-2 hidden-div mb-5"
        >
          <div>
            <label htmlFor="recipient-email" className="form-group form-row">
              <span className="col-md-2">Send Email to : </span>
              <input
                type="email"
                name="recipient-email"
                id="recipient-email"
                placeholder="Email"
                className="form-control form-control-sm rounded-corners col-md-10"
                readOnly
              />
            </label>
          </div>

          <div>
            <label htmlFor="recipient-fname" className="form-group form-row">
              <span className="col-md-2">Family name : </span>
              <input
                type="text"
                name="recipient-fname"
                id="recipient-fname"
                placeholder="fname"
                className="form-control form-control-sm rounded-corners col-md-10"
                readOnly
              />
            </label>
          </div>

          <div>
            <label htmlFor="email-msg" className="form-group form-row">
              <span className="col-md-2">Message : </span>
              <textarea
                name="email-msg"
                id="email-msg"
                cols="50"
                rows="10"
                placeholder="Type the nessage here ... "
                className="form-control form-control-sm rounded-corners col-md-10"
                onKeyPress={() => handleKeyPressWhileTypingEmailMessage(event, necessaryFields)}
              />
            </label>
          </div>

          <div>
            {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="form-group form-row">
              <span className="col-md-2">This is how the email will look like : </span>
              <div
                id="email-msg-preview"
                className="form-control form-control-sm rounded-corners col-md-10 p-5"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageApplicationsContainer;
