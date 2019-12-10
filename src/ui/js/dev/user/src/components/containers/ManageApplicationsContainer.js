/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import {
  FaRegUser,
  FaUserMinus,
  FaUserCheck,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';
import axios from 'axios';
import classnames from 'classnames';
import {
  getCurrentYear,
  handleSingleApplicantClicled,
  handleBackToListClicked,
  handleCloseSingleResultClicked,
  handleEmailBtnClicked,
  handleAsideNavItemClicked,
  handleTypingEmailInIframe,
  displayFontFamilies,
  displayFontSizes,
  handleSendEmailMsgBtnClicked,
} from '../../helpers/functions/handlers';

class ManageApplicationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationsArr: [],
      unRepliedApplications: [],
      repliedApplications: [],
    };
  }

  componentDidMount() {
    let unsentEmail;
    const unRepliedApplications = [];
    const repliedApplications = [];
    const token = localStorage.getItem('oauth');
    axios.get('/applications/get-all-unsent-emails',
      { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      unsentEmail = res.data;
    });

    axios.get('/applications/get-all-applications',
      { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      const applicationsArr = res.data;
      this.setState({ applicationsArr });

      /** iterating over all arrays to see if there are matching unsent emails */
      applicationsArr.forEach((currApp) => {
        unsentEmail.forEach((currUnsent) => {
          if (currUnsent.email === currApp.email) {
            axios.post('/applications/update-replied-from-application-table',
              { email: currUnsent.email });
          }
        });
        if (currApp.replied) {
          repliedApplications.push(currApp);
        } else {
          unRepliedApplications.push(currApp);
        }
      });
      this.setState({ unRepliedApplications, repliedApplications });
    });
    /** DEALING WITH AN IFRAME TYPING  */
    displayFontFamilies(document.getElementById('fontChanger'));
    displayFontSizes(document.getElementById('fontSize'));
    handleTypingEmailInIframe();
  }

  render() {
    const {
      applicationsArr,
      unRepliedApplications,
      repliedApplications,
    } = this.state;
    const necessaryFields = {
      allResultDiv: document.getElementById('all-results-div'),
      unRepliedApplicationsDiv: document.getElementById('unreplied-applications-div'),
      repliedApplicationsDiv: document.getElementById('replied-applications-div'),
      applicantDetails: document.getElementById('applicant-details'),
      backToListBtn: document.getElementById('back-to-list-btn'),
      emailingDiv: document.getElementById('emailing-div'),
      recipientEmail: document.getElementById('recipient-email'),
      recipientFname: document.getElementById('recipient-fname'),
      emailSubject: document.getElementById('emailSubject'),
      emailMsgIframe: document.getElementById('emailMsgIframe'),
      allApplicationsTab: document.getElementById('allApplicationsTab'),
      unRepliedApplicationsTab: document.getElementById('unRepliedApplicationsTab'),
      repliedApplicationsTab: document.getElementById('repliedApplicationsTab'),
      fontChanger: document.getElementById('fontChanger'),

    };
    let applicationsList;
    let unRepliedApplicationList;
    let repliedApplicationList;

    /** STRUCTURING ALL APPLICATIONS */
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
            {' '}
            {application.fname}
          </span>
          <span className="text-19 text-green mr-2 text-bold">
            {getCurrentYear() - application.year_of_birth}
            {' '}
            years old
          </span>
          <span className="text-19 text-white mr-2 text-bold">
            {application.education_level}
          </span>

          <span className="text-italic text-17 text-blue mr-2">
            {application.email}
          </span>
          <span className={classnames('text-19 mr-2 text-bold', {
            'field-success': application.replied, 'field-error': !application.replied,
          })}
          >
            {application.replied ? 'Replied' : 'unReplied'}
          </span>
          <span className={classnames('text-19 mr-2 text-bold', {
            'field-success': application.read, 'field-error': !application.read,
          })}
          >
            {application.read ? 'Read' : 'UnRead'}
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

    /** STRUNCTURING UNREPLIED APPLICATIONS */
    if (unRepliedApplications.length !== 0) {
      unRepliedApplicationList = unRepliedApplications.map((unReplied) => (
        <div
          key={unReplied.application_id}
          className="color-rigth-grey-transparent mt-2 p-2 rounded-corners hand-cursor"
          id={`unreplied_${unReplied.application_id}`}
          onClick={
            () => handleSingleApplicantClicled(event, unReplied, necessaryFields)
          }
        >
          <span className="fname-span text-22 text-bold mr-2">
            {' '}
            {unReplied.fname}
          </span>
          <span className="text-19 text-green mr-2 text-bold">
            {getCurrentYear() - unReplied.year_of_birth}
            {' '}
            years old
          </span>
          <span className="text-19 text-white mr-2 text-bold">
            {unReplied.education_level}
          </span>

          <span className="text-italic text-17 text-blue mr-2">
            {unReplied.email}
          </span>
          <span className={classnames('text-19 mr-2 text-bold', {
            'field-success': unReplied.replied, 'field-error': !unReplied.replied,
          })}
          >
            {unReplied.replied ? 'Replied' : 'unReplied'}
          </span>
          <span className={classnames('text-19 mr-2 text-bold', {
            'field-success': unReplied.read, 'field-error': !unReplied.read,
          })}
          >
            {unReplied.read ? 'Read' : 'UnRead'}
          </span>
          <span className="float-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-corners hand-cursor"
              id={`unreplied_${unReplied.application_id}`}
              onClick={() => handleCloseSingleResultClicked(event, unReplied, this)}
            >
              &times;
            </button>
          </span>
        </div>
      ));
    }

    /** STRUCTURING REPLIED APPLICATIONS */
    if (repliedApplications.length !== 0) {
      repliedApplicationList = repliedApplications.map((repliedApps) => (
        <div
          key={repliedApps.application_id}
          className="color-rigth-grey-transparent mt-2 p-2 rounded-corners hand-cursor"
          id={`repliedApp_${repliedApps.application_id}`}
          onClick={
            () => handleSingleApplicantClicled(event, repliedApps, necessaryFields)
          }
        >
          <span className="fname-span text-22 text-bold mr-2">
            {' '}
            {repliedApps.fname}
          </span>
          <span className="text-19 text-green mr-2 text-bold">
            {getCurrentYear() - repliedApps.year_of_birth}
            {' '}
            years old
          </span>
          <span className="text-19 text-white mr-2 text-bold">
            {repliedApps.education_level}
          </span>

          <span className="text-italic text-17 text-blue mr-2">
            {repliedApps.email}
          </span>
          <span className={classnames('text-19 mr-2 text-bold', {
            'field-success': repliedApps.replied, 'field-error': !repliedApps.replied,
          })}
          >
            {repliedApps.replied ? 'Replied' : 'Unreplied'}
          </span>
          <span className={classnames('text-19 mr-2 text-bold', {
            'field-success': repliedApps.read, 'field-error': !repliedApps.read,
          })}
          >
            {repliedApps.read ? 'Read' : 'UnRead'}
          </span>
          <span className="float-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-corners hand-cursor"
              id={`repliedApp_${repliedApps.application_id}`}
              onClick={() => handleCloseSingleResultClicked(event, repliedApps, this)}
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
            {/** ALL APPLICATIONS TAB */}
            <li>
              <div
                className="nav-item hand-cursor mt-5 text-blue color-dark-purple active-tab"
                onClick={() => handleAsideNavItemClicked(event, necessaryFields)}
                id="allApplicationsTab"
              >
                <p className="text-50" id="allApplicationsTab">
                  <FaRegUser
                    id="allApplicationsTab"
                  />
                </p>
                <span id="allApplicationsTab"> All</span>
              </div>
            </li>

            {/** UNREPLIED APPLICATION TAB */}
            <li>
              <div
                className="nav-item hand-cursor mt-5 text-danger"
                onClick={() => handleAsideNavItemClicked(event, necessaryFields)}
                id="unRepliedApplicationsTab"
              >
                <p className="text-50" id="unRepliedApplicationsTab">
                  <FaUserMinus
                    id="unRepliedApplicationsTab"
                  />
                </p>
                <span id="unRepliedApplicationsTab">UnReplied</span>
              </div>
            </li>

            {/** REPLIED APPLICATIONS TAB */}
            <li>
              <div
                className="nav-item hand-cursor mt-5 text-green"
                onClick={() => handleAsideNavItemClicked(event, necessaryFields)}
                id="repliedApplicationsTab"
              >
                <p className="text-50" id="repliedApplicationsTab">
                  <FaUserCheck
                    id="repliedApplicationsTab"
                  />
                </p>
                <span id="repliedApplicationsTab">Replied</span>
              </div>
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
        {/** SHOWING NOT REPLIED APPLICATIONS */}
        <div
          className="mt-5 heigth-80 overflow-auto width-80 color-grey-transparent p-2 hidden-div"
          id="unreplied-applications-div"
        >
          {unRepliedApplicationList}
        </div>
        {/** SHOWING REPLIED APPLICATIONS */}
        <div
          className="mt-5 heigth-80 overflow-auto width-80 color-grey-transparent p-2 hidden-div"
          id="replied-applications-div"
        >
          {repliedApplicationList}
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
              <input
                type="email"
                name="recipient-email"
                id="recipient-email"
                placeholder="Email"
                className="form-control form-control-sm rounded-corners col-md-10"
                readOnly
                hidden
              />
            </label>
          </div>


          <div>
            <label htmlFor="recipient-fname" className="form-group form-row">
              <input
                type="text"
                name="recipient-fname"
                id="recipient-fname"
                placeholder="fname"
                className="form-control form-control-sm rounded-corners col-md-10"
                readOnly
                hidden
              />
            </label>
          </div>

          <div>
            <label htmlFor="emailSubject" className="form-group form-row">
              <span className="col-md-2">Subject : </span>
              <input
                type="text"
                name="emailSubject"
                id="emailSubject"
                placeholder="Eg.: Your application process status..."
                className="form-control form-control-sm rounded-corners col-md-10"
              />
            </label>
          </div>

          <div>
            <label htmlFor="emailMsgIframe" className="form-group form-row">
              <span className="col-md-2">Message : </span>
              <div
                id="textEditor"
                className="col-md-10"
              >
                <div id="theRibbon">
                  <button type="button" id="boldBtn" title="Bold"><b>B</b></button>
                  <button type="button" id="italicBtn" title="Italic"><em>I</em></button>
                  <button type="button" id="underlineBtn" title="Underline"><u>U</u></button>
                  <button type="button" id="justifyLeftBtn" title="Align left"><FaAlignLeft /></button>
                  <button type="button" id="justifyCenterBtn" title="Align Center"><FaAlignCenter /></button>
                  <button type="button" id="justifyRightBtn" title="Align Right"><FaAlignRight /></button>
                  <button type="button" id="justifyFullBtn" title="Align Justify"><FaAlignJustify /></button>
                  <button type="button" id="supBtn" title="Superscript">
                    X
                    <sup>2</sup>
                  </button>
                  <button type="button" id="subBtn" title="Subscript">
                    X
                    <sub>2</sub>
                  </button>
                  <button type="button" id="strikeBtn" title="Strikethrough"><s>abc</s></button>
                  <button type="button" id="orderedListBtn" title="Numbered list">(i)</button>
                  <button type="button" id="unorderedListBtn" title="Bulleted list">&bull;</button>
                  <input type="color" id="fontcolorBtn" title="Change Font color" />
                  <input type="color" id="highlightBtn" title="Highlight Text" />
                  <select id="fontChanger" />
                  <select id="fontSize" />
                  <button type="button" id="linkBtn" title="Create a link">Link</button>
                  <button type="button" id="unlinkBtn" title="Remove a link">UnLink</button>
                  <button type="button" id="undoBtn" title="Undo the previous action">&larr;</button>
                  <button type="button" id="redoBtn" title="Redo">&rarr;</button>
                </div>
                <div id="richTextArea">
                  <iframe
                    title="email-message-iframe"
                    id="emailMsgIframe"
                    name="emailMsgIframe"
                    frameBorder="0"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleSendEmailMsgBtnClicked(necessaryFields)}
                    className="btn btn-block btn-sm btn-success"
                  >
                    Send Message

                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageApplicationsContainer;
