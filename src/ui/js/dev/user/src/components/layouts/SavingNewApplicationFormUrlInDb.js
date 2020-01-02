/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  handleApplicationFormUrlTyping,
  handleSaveApplicationFormUrlBtnClicked,
  handleApplicationFormUrlEditorInitialize,
} from '../../helpers/functions/handlers';

class SavingNewApplicationFormUrlInDb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUrlRegistered: false,
    };
  }

  componentDidMount() {
    const necessaryFields = {
      urlTextInputField: document.getElementById('url-text-input-field'),
      urlCheckingDiv: document.getElementById('url-checking-div'),
      urlCheckingResultSpan: document.getElementById('url-checking-result-span'),
      urlFormEditor: document.getElementById('url-form-editor'),
      urlFormSaveResultsContainerDiv: document.getElementById('url-form-save-results-div-container'),
      urlResultsFromDb: document.getElementById('url-form-results-from-db'),
      urlCheckSpinnerHolderSpan: document.getElementById('url-check-spinner-holder-span'),
    };
    this.setState({ necessaryFields });
    // handleApplicationFormUrlEditorInitialize(this);
  }

  render() {
    return (
      <div className="centered-div heigth-80 width-80 color-rigth-grey-transparent p-5 rounded-corners">
        <div id="url-form-editor">
          <div className="form-group form-row">
            <input
              type="text"
              placeholder="Type or paste an application form url here"
              className="form-control form-control-lg col-md-10"
              id="url-text-input-field"
              onChange={() => handleApplicationFormUrlTyping(this)}
            />
            <button
              type="button"
              className="btn btn-lg btn-primary col-md-2"
              onClick={() => handleSaveApplicationFormUrlBtnClicked(this)}
            >
            Save
            </button>
            <div id="url-checking-div" className="width-40 text-center hidden-div">
              <span
                id="url-check-spinner-holder-span"
                className="spinner-border text-warning"
              />
              <br />
              <span className="text-overflow-auto text-wrap" id="url-checking-result-span" />
            </div>
          </div>
        </div>
        <div id="url-form-save-results-div-container" className="hidden-div">
          <div
            className="color-white p-5 rounded-corners text-17 width-50"
            id="url-form-results-from-db"
          />
          <div className="form-group form-row width-50">
            <button
              type="button"
              className="col-md-6 btn btn-sm btn-info"
              onClick={() => handleApplicationFormUrlEditorInitialize(this)}
            >
            Save another url
            </button>
            <button
              type="button"
              className="col-md-6 btn btn-sm btn-danger"
            >
Go back to your profile
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SavingNewApplicationFormUrlInDb;
