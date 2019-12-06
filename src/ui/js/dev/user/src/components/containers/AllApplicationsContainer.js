import React, { Component } from 'react';
import { FaReply, FaReplyAll, FaReplyd } from 'react-icons/fa';

class ManageApplicationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="aside-bar mt-5 p-2 text-white">

        <ul className="nav flex-column">
          <li className="nav-item hand-cursor mt-5">
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
    );
  }
}

export default ManageApplicationsContainer;
