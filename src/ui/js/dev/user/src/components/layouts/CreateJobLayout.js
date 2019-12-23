/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {
  Container,
  Row,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import {
  FaBold,
  FaStrikethrough,
  FaItalic,
  FaUnderline,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBackspace,
  FaAlignJustify,
  FaSuperscript,
  FaSubscript,
  FaListOl,
  FaListUl,
  FaLink,
  FaUnlink,
  FaUndo,
  FaRedo,
  FaCopy,
  FaCut,
  FaTypo3,
} from 'react-icons/fa';

class CreateJobLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobdeadline: new Date(),
    };
  }

  handlejobdeadline = (date) => {
    this.setState({ jobdeadline: date });
  };

  render() {
    const { jobdeadline } = this.state;
    return (
      <Container>

        <Row
          id="applicationFormDiv"
          className="shadows mb-5 mt-5 width-98 text-white black-bordered-element black-transparent-element rounded-corners padding-15"
        >
          <div className="col-md-10 application-form">
            <div>
              <h3 className="text-center text-success">Create your job offer here:</h3>

              <div className="form-group form-row">
                <label
                  htmlFor="jobtitle"
                  className="col-md-4 hand-cursor"
                >
                  Job title:
                </label>
                <input
                  type="text"
                  name="jobtitle"
                  id="jobtitle"
                  placeholder="eg.: Senior software engineer"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                />
              </div>
              <div className="text-center text-danger">
                <span id="jobtitleError" />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="companyname"
                  className="col-md-4 hand-cursor"
                >
                  Company name :
                </label>
                <input
                  type="text"
                  name="companyname"
                  id="companyname"
                  placeholder="eg.: Neza Inc."
                  className="col-md-8 form-control-sm form-control rounded-corners"
                />
              </div>
              <div className="form-group form-row">
                <label
                  htmlFor="jobdeadline"
                  className="col-md-4 hand-cursor"
                >
                  Job deadline :
                </label>
                <div className="col-md-8 form-control-sm form-control rounded-corners text-center">
                  <DatePicker
                    selected={jobdeadline}
                    onChange={this.handlejobdeadline}
                    id="jobdeadline"
                    dateFormat="yyyy-MM-dd"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>

              <div className="form-group form-row">
                <label
                  htmlFor="companyemail"
                  className="col-md-4 hand-cursor"
                >
                  Your company&apos;s email :
                </label>
                <input
                  type="companyemail"
                  name="companyemail"
                  id="companyemail"
                  placeholder="eg.: recruit.neza@neza.com"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                />
              </div>
              <div className="text-center text-danger">
                <span id="companyemailError" />
              </div>

              <div className="form-group form-row mb-5">
                <label
                  htmlFor="password"
                  className="col-md-4 hand-cursor"
                >
                  Job Descriptions :
                </label>
                <div className="col-md-8">
                  <div>
                    <label htmlFor="emailMsgIframe" className="form-group form-row">
                      <div
                        id="textEditor"
                      >
                        <div id="theRibbon">
                          <button type="button" id="boldBtn" title="Bold"><FaBold /></button>
                          <button type="button" id="italicBtn" title="Italic"><FaItalic /></button>
                          <button type="button" id="underlineBtn" title="Underline"><FaUnderline /></button>
                          <button type="button" id="justifyLeftBtn" title="Align left"><FaAlignLeft /></button>
                          <button type="button" id="justifyCenterBtn" title="Align Center"><FaAlignCenter /></button>
                          <button type="button" id="justifyRightBtn" title="Align Right"><FaAlignRight /></button>
                          <button type="button" id="justifyFullBtn" title="Align Justify"><FaAlignJustify /></button>
                          <button type="button" id="supBtn" title="Superscript">
                            <FaSuperscript />
                          </button>
                          <button type="button" id="subBtn" title="Subscript">
                            <FaSubscript />
                          </button>
                          <button type="button" id="strikeBtn" title="Strikethrough"><FaStrikethrough /></button>
                          <button type="button" id="orderedListBtn" title="Numbered list"><FaListOl /></button>
                          <button type="button" id="unorderedListBtn" title="Bulleted list"><FaListUl /></button>
                          <input type="color" id="fontcolorBtn" title="Change Font color" />
                          <input type="color" id="highlightBtn" title="Highlight Text" />
                          <select id="fontChanger" />
                          <select id="fontSize" />
                          <button type="button" id="linkBtn" title="Create a link"><FaLink /></button>
                          <button type="button" id="unlinkBtn" title="Remove a link"><FaUnlink /></button>
                          <button type="button" id="undoBtn" title="Undo the previous action"><FaUndo /></button>
                          <button type="button" id="redoBtn" title="Redo"><FaRedo /></button>
                          <button type="button" id="backspaceBtn" title="Delete previous character"><FaBackspace /></button>
                          <button type="button" id="copyBtn" title="Copy"><FaCopy /></button>
                          <button type="button" id="cutBtn" title="Cut"><FaCut /></button>
                          <button type="button" id="selectAllBtn" title="Select all"><FaTypo3 /></button>
                        </div>
                        <div id="richTextArea">
                          <iframe
                            title="email-message-iframe"
                            id="emailMsgIframe"
                            name="emailMsgIframe"
                            frameBorder="0"
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <label
                  htmlFor="confirmpassword"
                  className="col-md-4 hand-cursor"
                >
                  Confirm Password :
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="eg.: myconfirmpassword"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                />
              </div>
              <div className="text-center text-danger">
                <span id="confirmpasswordError" />
              </div>
              <div>
                <button
                  type="button"
                  className="col-md-12 btn btn-block btn-info btn-sm rounded-corners"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default CreateJobLayout;
