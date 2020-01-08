import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserInfo, getOauth } from '../../../../../../../helpers/resources/list-of-needed-resouces';
import { getDateFromDateTime, getTimeFromDateTime } from '../../../../../../../helpers/functions/general-handlers';

class LoggedInUserProfileLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.post('/user-logs/get-particular-log-by-user-id',
      { userid: getUserInfo().user_id }, { headers: getOauth() }).then((res) => {
      this.setState({ allThisUserLogs: res.data });
    }).catch((err) => {
      this.setState({ allThisUserLogs: [err.response.data] });
    });
  }

  render() {
    const { allThisUserLogs } = this.state;
    let thisUserLogList;
    if (allThisUserLogs) {
      thisUserLogList = allThisUserLogs.info.map((log) => (
        <tr key={log.user_log_id} className="hand-cursor text-white">
          <td>
          You
            {' '}
            {log.user_action}
          </td>
          <td>
            On
            {' '}
            {getDateFromDateTime(log.user_log_time)}
          </td>
          <td>
          at
            {' '}
            {getTimeFromDateTime(log.user_log_time)}
          </td>
        </tr>
      ));
    }
    return (
      <div className="width-100 h-100 color-primary p-2 position-absolute-top-left mt-5">

        <div>
          {/** leftside col */}
          <div className="position-absolute-top-left color-rigth-grey-transparent p-5 mr-2">
            <div>
              <span className="mr-1 text-17">{getUserInfo().fname}</span>
              <span className="mr-1 text-17">{getUserInfo().midname}</span>
              <span className="mr-1 text-17">{getUserInfo().lname}</span>
            </div>
            <div>
              <span>{getUserInfo().email}</span>
            </div>
            <div>
              <span>
                Birthday :
                {getDateFromDateTime(getUserInfo().date_of_birth)}
              </span>
            </div>
          </div>

          {/** middle-center col */}
          <div className=" heigth-80 width-60 color-rigth-grey-transparent p-2 mr-2 mt-5">
            <table className="table table-hover table-responsive">
              <tbody>
                {thisUserLogList}
              </tbody>
            </table>
          </div>

          {/** right side col */}
          <div className=" position-absolute-top-right color-rigth-grey-transparent p-2 mr-2">
            <div>
              <span>
                <Link to="/create-or-edit-a-job">Create a job here</Link>
              </span>
            </div>
            <div>
              <span>
                <Link to="/save-new-application-form-url">Register an application form url</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoggedInUserProfileLayout;
