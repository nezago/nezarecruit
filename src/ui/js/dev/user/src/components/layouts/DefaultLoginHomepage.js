/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { getUserInfo } from '../../../../../../../helpers/resources/list-of-needed-resouces';

class DefaultLoginHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="centered-div">
        <div className="rounded-corners p-5 text-50 color-rigth-grey-transparent width-80">
            Hello
          {' '}
          {getUserInfo().fname}
, We do believe that you gonna enjoy staying with us,
please try many possibilities we give you by navigating with differents options we provide you
        </div>
      </div>
    );
  }
}

export default DefaultLoginHomepage;
