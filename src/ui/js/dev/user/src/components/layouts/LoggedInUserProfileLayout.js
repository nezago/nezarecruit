import React, { Component } from 'react';
// import { getUserInfo } from '../../../../../../../helpers/resources/list-of-needed-resouces';

class LoggedInUserProfileLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   this.setState({ currUser: getUserInfo() });
  // }

  render() {
    return (
      <div className="mt-5">This is a profile page of a currUser</div>
    );
  }
}

export default LoggedInUserProfileLayout;
