import React, { Component } from 'react';

class SavingNewApplicationFormUrlInDb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="centered-div heigth-80 width-80 color-rigth-grey-transparent p-5 rounded-corners">
        <div id="url-form-editor">
          <div className="form-group form-row">
            <input
              type="text"
              placeholder="Enter an application form here : "
              className="form-control form-control-lg col-md-10"
            />
            <button
              type="button"
              className="btn btn-lg btn-primary col-md-2"
            >
            Save
            </button>
            <div id="url-checking-div" className="width-20 hidden-div">
              <span className="spinner-border text-warning" />
            </div>
          </div>
        </div>
        <div id="url-form-save-results-div-container" className="hidden-div">
          <div
            className="color-white p-5 rounded-corners text-17 width-50"
            id="url-form-results-from-db"
          />
          <div className="form-group form-row">
            <button type="button" className="col-md-6 btn btn-sm btn-info">Save another url</button>
            <button type="button" className="col-md-6 btn btn-sm btn-danger">go back to your profile</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SavingNewApplicationFormUrlInDb;
