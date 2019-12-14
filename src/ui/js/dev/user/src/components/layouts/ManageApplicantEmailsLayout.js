/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import axios from 'axios';
import { getOauth } from '../../../../../../../helpers/resources/list-of-needed-resouces';
import {
  getDateFromDateTime,
  handleCloseSingleResultClicked,
  handleSingleSentEmailClicked, handleBackToListClickedFromEmailDetails,
} from '../../helpers/functions/handlers';

class ManageApplicantEmailsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSentEmailsArr: [],
    };
  }

  componentDidMount() {
    axios.get('/applications/get-all-sent-e-mail', { headers: getOauth() }).then((res) => {
      this.setState({ allSentEmailsArr: res.data });
    }).catch((err) => {
      this.setState({ allSentEmailsArr: [err.response.data] });
    });
  }

  render() {
    const { allSentEmailsArr } = this.state;
    const necessaryFields = {
      sentEmailDetails: document.getElementById('sent-email-details'),
      allResultDiv: document.getElementById('all-results-div'),
      backToListDiv: document.getElementById('back-to-list'),
    };
    let allSentEmailsList;
    if (allSentEmailsArr.length !== 0) {
      /** STRUCTURING ALL SENT EMAILS */
      allSentEmailsList = allSentEmailsArr.map((singleSentEmail) => (
        <div
          key={singleSentEmail.sent_email_id}
          id={singleSentEmail.sent_email_id}
          className="color-rigth-grey-transparent mt-2 p-2 rounded-corners hand-cursor"
          onClick={() => handleSingleSentEmailClicked(event, singleSentEmail, necessaryFields)}
        >
          <span className="fname-span text-22 text-bold mr-2">
            {' '}
            {singleSentEmail.email_address}
          </span>
          <span className="text-19 text-green mr-2 text-bold">
            {singleSentEmail.email_subject}
          </span>
          <span className="text-19 text-white mr-2 text-bold">
            {singleSentEmail.sender_email_address}
          </span>

          <span className="text-italic text-17 text-blue mr-2">
            {getDateFromDateTime(singleSentEmail.sent_on)}
          </span>
          <span className="float-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-corners hand-cursor"
              id={singleSentEmail.sent_email_id}
              onClick={() => handleCloseSingleResultClicked(event)}
            >
              &times;
            </button>
          </span>
        </div>
      ));
    }
    return (
      <div>
        {/** SHOWING ALL SENT EMAILS LIST */}
        <div
          className="mt-5 heigth-80 overflow-auto width-80 color-dark-purple p-2"
          id="all-results-div"
        >
          {allSentEmailsList}
        </div>

        <div id="back-to-list" className="position-fixed-top-right hidden-div">
          <button
            type="button"
            className="btn btn-sm btn-info rounded-corners"
            onClick={() => handleBackToListClickedFromEmailDetails(necessaryFields)}
          >
            Go back to list
          </button>
        </div>
        {/** SHOWING ALL DETAILS */}
        <div
          className="mt-5 heigth-80 overflow-auto width-80 color-rigth-grey-transparent p-2 hidden-div"
          id="sent-email-details"
        />

      </div>
    );
  }
}

export default ManageApplicantEmailsLayout;
