import React, { Component } from 'react';
import axios from 'axios';

class HomepageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    axios.get('/manage-homepage/get-all-manage-homepage').then((res) => {
      this.setState({ allManageHomepageRes: res.data });
    }).catch((err) => {
      this.setState({ manageHomepageErr: err.response.data });
    });
  }

  render() {
    const { allManageHomepageRes, manageHomepageErr } = this.state;

    if (allManageHomepageRes) {
      console.log(allManageHomepageRes);
    }
    return (
      <div className="homepage-container">
        <h1>Hello this is a homepage container</h1>
        <div id="why-nezarecruit" />
        <div id="what-nezarecruit" />
        <div>
          <span className="text-danger">{manageHomepageErr || ''}</span>
        </div>
      </div>
    );
  }
}

export default HomepageContainer;
