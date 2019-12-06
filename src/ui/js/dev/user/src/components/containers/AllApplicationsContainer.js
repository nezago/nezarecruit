import React, { Component } from 'react';

class ManageApplicationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mt-5">
        <div className="aside-bar heigth-100 color-black width-20 ml-0 p-2 text-22">
          <ul className="nav">
            <li className="nav-item hand-cursor mt-5">All applications</li>
            <li className="nav-item hand-cursor mt-5">UnReplied applications</li>
            <li className="nav-item hand-cursor mt-5">Replied applications</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ManageApplicationsContainer;
