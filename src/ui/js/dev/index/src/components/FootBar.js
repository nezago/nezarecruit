import React, { Component } from 'react';
import { FaCopyright } from 'react-icons/fa';

class FootBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="foot-bar">
        <FaCopyright />
        Neza 2020
      </div>
    );
  }
}

export default FootBar;
