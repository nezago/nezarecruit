/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import axios from 'axios';
import {
  getDateFromDateTime, handleSingleJobClicked,
} from '../../helpers/functions/handlers';

class ManageUnlinkedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/jobs/get-all-jobs?isTMP=true').then((res) => {
      const allUnLinkedJobs = res.data;
      this.setState({ allUnLinkedJobs });
    }).catch((err) => {
      console.log(err.response.data);
    });
    const necessaryFields = {
      jobsListDiv: document.getElementById('jobs-list'),
      backToListDiv: document.getElementById('back-to-list'),
      jobDetailsDiv: document.getElementById('job-details'),
      jobDetailsHolderDiv: document.getElementById('job-details-holder-div'),

    };
    this.setState({ necessaryFields });
  }

  render() {
    const { allUnLinkedJobs } = this.state;
    let unlinkedJobList;
    if (allUnLinkedJobs) {
      console.log(allUnLinkedJobs);
      if (allUnLinkedJobs.length === 0) {
        unlinkedJobList = (
          <tr className="text-danger">
            <td>.</td>
            <td>.</td>
            <td>Sorry! No unlinked job found here!</td>
            <td>.</td>
          </tr>
        );
      } else {
        unlinkedJobList = allUnLinkedJobs.map((job) => (

          <tr
            key={job.job_id}
            className="hand-cursor color-rigth-grey-transparent"
            onClick={() => handleSingleJobClicked(this, job)}
          >
            <td><span className="mr-5">{job.job_id}</span></td>
            <td><span className="mr-5">{job.job_title}</span></td>
            <td><span className="mr-5">{job.company_name}</span></td>
            <td><span className="mr-5">{getDateFromDateTime(job.job_deadline)}</span></td>
          </tr>
        ));
      }
    }
    return (
      <div className="width-80 color-grey-transparent p-2">
        <div id="jobs-list">
          <table className="table table-hover">
            <caption className="text-10 font-italic font-weight-bolder">
              List of all un linked jobs
            </caption>
            <thead className="thead-dark">
              <tr>
                <th className="mr-5">Job Id</th>
                <th className="mr-5">Job Title</th>
                <th className="mr-5">Company name</th>
                <th className="mr-5">Job deadline</th>
              </tr>
            </thead>
            <tbody>
              {unlinkedJobList}
            </tbody>
          </table>
        </div>
        {/** Go back to list btn */}
        <div id="back-to-list" className="position-fixed-top-right hidden-div">
          <button
            type="button"
            className="btn btn-sm btn-info rounded-corners"
          >
            Go back to list
          </button>
        </div>
        <div id="job-details" className="hidden-div">
          <div id="job-details-holder-div" />
        </div>

      </div>
    );
  }
}

export default ManageUnlinkedJobs;
