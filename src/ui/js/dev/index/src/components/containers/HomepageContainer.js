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
    const {
      allManageHomepageRes,
      manageHomepageErr,
    } = this.state;

    if (allManageHomepageRes && allManageHomepageRes[0]) {
      const allMessageElt = allManageHomepageRes[0];
      document.getElementById('what-nezarecruit-title')
        .innerHTML = allMessageElt.what_nezarecruit_title || '';
      document.getElementById('what-nezarecruit')
        .innerHTML = allMessageElt.what_nezarecruit || '';
      document.getElementById('why-nezarecruit-title')
        .innerHTML = allMessageElt.why_nezarecruit_title || '';
      document.getElementById('why-nezarecruit').innerHTML = allMessageElt.why_nezarecruit || '';
    }
    return (
      <div className="homepage-container">
        <div className="homepage-book">
          <div>
            <div className="homepage-book-cover">
              <figure className="homepage-book-cover-front" />
              <figure className="homepage-book-cover-back">
                <div className="homepage-book-cover-back-text p-5">
                  <div id="what-nezarecruit-title" />
                  <div id="what-nezarecruit" />
                </div>
              </figure>
            </div>
          </div>
          <div className="p-5">
            <div id="why-nezarecruit-title" />
            <div id="why-nezarecruit" />
          </div>
          <div>
            <span className="text-danger">{manageHomepageErr || ''}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default HomepageContainer;
