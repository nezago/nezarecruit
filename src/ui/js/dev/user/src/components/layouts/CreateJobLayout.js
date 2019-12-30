/* eslint-disable no-restricted-globals */
/* eslint-disable react/destructuring-assignment */
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
  FaPlusCircle,
} from 'react-icons/fa';
import {
  handleTypingEmailInIframe,
  displayFontFamilies,
  displayFontSizes,
  handleJobRequirementsAdded,
  handleAppFormUrlOrCustom,
  displayFontFamilie2InManageHomepage,
  displayFontSize2InManageHomepage,
  handleTypingWhyNezarecuritInIframe,
  handleSaveJobBtnClicked,
  handleCompanyEmailTyping,
  handleJobDetailsEditorsInitialize,
} from '../../helpers/functions/handlers';

class CreateJobLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobdeadline: new Date(),
    };
  }

  componentDidMount() {
    displayFontSizes(document.getElementById('fontSize'));
    displayFontFamilies(document.getElementById('fontChanger'));
    displayFontFamilie2InManageHomepage(document.getElementById('fontChanger2'));
    displayFontSize2InManageHomepage(document.getElementById('fontSize2'));
    handleTypingEmailInIframe();
    handleTypingWhyNezarecuritInIframe();
    const necessaryFields = {
      jobtitlefield: document.getElementById('jobtitle'),
      jobtitleError: document.getElementById('jobtitleError'),
      companynamefield: document.getElementById('companyname'),
      companynameError: document.getElementById('companynameError'),
      jobdeadlinefield: document.getElementById('jobdeadline'),
      jobdeadlineError: document.getElementById('jobdeadlineError'),
      companyemailfield: document.getElementById('companyemailfield'),
      companyemailfieldError: document.getElementById('companyemailfieldError'),
      jobdescriptioniframe: document.getElementById('emailMsgIframe'),
      customemailtosendtouseriframe: document.getElementById('whyNezarecruitIframe'),
      jobRequirementInputField: document.getElementById('jobrequirementsinput'),
      jobRequirementDisplayDiv: document.getElementById('jobRequirementDisplayDiv'),
      jobRequirementError: document.getElementById('jobrequirementsError'),
      applicationFormUrlBtn: document.getElementById('application-form-url-btn'),
      applicationFormUrlDiv: document.getElementById('application-form-url-div'),
      applicationFormUrlInputField: document.getElementById('applicationFormUrlInputField'),
      customApplicationFormBtn: document.getElementById('custom-application-form-btn'),
      customApplicationFormDiv: document.getElementById('custom-application-form'),
      jobDetailsEditorDiv: document.getElementById('job-details-editor-div'),
      saveJobdetailsResultDiv: document.getElementById('save-jobdetails-result-div'),
      saveJobdetailsResultContainer: document.getElementById('save-jobdetails-result-div-container'),
      spinnerBorder: document.getElementById('spinner-border'),
      spinnerGrow: document.querySelectorAll('span#spinner-grow'),
      spanSaveJob: document.getElementById('span-save-job'),

    };
    this.setState({ necessaryFields });
    handleJobDetailsEditorsInitialize(necessaryFields);
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
          <div id="job-details-editor-div" className="col-md-10 application-form">
            <div>
              <h3 className="text-center text-success">Fill the job details here:</h3>

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
              <div className="text-center text-danger">
                <span id="companynameError" />
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
              <div className="text-center text-danger">
                <span id="jobdeadlineError" />
              </div>


              <div className="form-group form-row">
                <label
                  htmlFor="companyemailfield"
                  className="col-md-4 hand-cursor"
                >
                  Your company&apos;s email :
                </label>
                <input
                  type="companyemailfield"
                  name="companyemailfield"
                  id="companyemailfield"
                  placeholder="eg.: recruit.neza@neza.com"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onChange={() => handleCompanyEmailTyping(this.state.necessaryFields)}
                />
              </div>
              <div className="text-center text-danger">
                <span id="companyemailfieldError" />
              </div>


              {/** JOB DESCRIPTION PORTION */}
              <div className="form-group form-row mb-5">
                <label
                  htmlFor="emailMsgIframe"
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
                          {/* <button type="button" id="attachPictBtn" title="Attach
                           a picture"><FaDigitalTachograph /></button> */}
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
              {/** END OF JOB DESCRIPTION PORTION */}

              {/** custom email portion */}
              <div className="form-group form-row mb-5">
                <label
                  htmlFor="emailMsgIframe"
                  className="col-md-4 hand-cursor"
                >
                  Add a custom email to send an applicant :
                </label>
                <label htmlFor="customEmailPortion" className="col-md-8">
                  <div id="theRibbon">
                    <button type="button" id="boldBtn2" title="Bold"><FaBold /></button>
                    <button type="button" id="italicBtn2" title="Italic"><FaItalic /></button>
                    <button type="button" id="underlineBtn2" title="Underline"><FaUnderline /></button>
                    <button type="button" id="justifyLeftBtn2" title="Align left"><FaAlignLeft /></button>
                    <button type="button" id="justifyCenterBtn2" title="Align Center"><FaAlignCenter /></button>
                    <button type="button" id="justifyRightBtn2" title="Align Right"><FaAlignRight /></button>
                    <button type="button" id="justifyFullBtn2" title="Align Justify"><FaAlignJustify /></button>
                    <button type="button" id="supBtn2" title="Superscript">
                      <FaSuperscript />
                    </button>
                    <button type="button" id="subBtn2" title="Subscript">
                      <FaSubscript />
                    </button>
                    <button type="button" id="strikeBtn2" title="Strikethrough"><FaStrikethrough /></button>
                    <button type="button" id="orderedListBtn2" title="Numbered list"><FaListOl /></button>
                    <button type="button" id="unorderedListBtn2" title="Bulleted list"><FaListUl /></button>
                    <input type="color" id="fontcolorBtn2" title="Change Font color" />
                    <input type="color" id="highlightBtn2" title="Highlight Text" />
                    <select id="fontChanger2" />
                    <select id="fontSize2" />
                    <button type="button" id="linkBtn2" title="Create a link"><FaLink /></button>
                    <button type="button" id="unlinkBtn2" title="Remove a link"><FaUnlink /></button>
                    <button type="button" id="undoBtn2" title="Undo the previous action"><FaUndo /></button>
                    <button type="button" id="redoBtn2" title="Redo"><FaRedo /></button>
                    <button type="button" id="backspaceBtn2" title="Delete previous character"><FaBackspace /></button>
                    <button type="button" id="copyBtn2" title="Copy"><FaCopy /></button>
                    <button type="button" id="cutBtn2" title="Cut"><FaCut /></button>
                    <button type="button" id="selectAllBtn2" title="Select all"><FaTypo3 /></button>
                  </div>
                  <div id="richTextArea2">
                    <iframe
                      title="why-nezarecruit-iframe"
                      id="whyNezarecruitIframe"
                      name="whyNezarecruitIframe"
                      frameBorder="0"
                    />
                  </div>
                </label>
              </div>

              {/** end of custom email portion */}


              <div className="form-group form-row mt-5">
                <label
                  htmlFor="jobrequirementsinput"
                  className="col-md-4 hand-cursor"
                >
                  Add a job requirements :
                </label>
                <input
                  type="text"
                  name="jobrequirementsinput"
                  id="jobrequirementsinput"
                  placeholder="eg.: Experience of 1 year"
                  className="col-md-7 form-control-sm form-control rounded-corners"
                />
                <button
                  type="button"
                  className="btn btn-block btn-info btn-sm rounded-circle col-md-1"
                  onClick={() => handleJobRequirementsAdded(this.state.necessaryFields)}
                >
                  <FaPlusCircle />
                </button>
              </div>
              <div id="jobRequirementDisplayDiv" />
              <div className="text-center text-danger">
                <span id="jobrequirementsError" />
              </div>


              {/** APPLICATION FORM DECISION PORTION */}
              <div id="applicationFormURLorCREATEbtns" className="mt-5 form-group form-row">
                <button
                  type="button"
                  id="application-form-url-btn"
                  className="btn btn-outline-info btn-sm btn-block col-md-6 rounded-corners"
                  onClick={() => handleAppFormUrlOrCustom(event, this.state.necessaryFields)}
                >
                  Enter the URL to application-form
                </button>
                <button
                  type="button"
                  id="custom-application-form-btn"
                  className="btn btn-outline-info btn-sm btn-block col-md-6 rounded-corners"
                  onClick={() => handleAppFormUrlOrCustom(event, this.state.necessaryFields)}
                >
                  Create your custom application form here!
                </button>
              </div>

              { /** THIRD PARTY APPLICATION FORM URL */}
              <div
                className="mt-5"
                id="application-form-url-div"
              >
                <label htmlFor="thirdPartyApplicationFormUrl" className="form-group form-row">
                  <span
                    className="col-md-4 hand-cursor"
                  >
                    Enter your application-form url here:
                  </span>
                  <input
                    type="text"
                    name="thirdPartyApplicationFormUrl"
                    id="applicationFormUrlInputField"
                    placeholder="eg.: https://recruit.neza.com/jobs/14345"
                    className="col-md-8 form-control form-control-sm rounded-corners"
                  />
                </label>
              </div>

              { /** CREATING HIS OWN APPLICATION FORM */}
              <div id="custom-application-form" className="hidden-div">
                <h5 className="text-center text-danger">
                  Sorry! We are working on this, soon it will be available,
                    So, please contact the nezarecruit administrators, to get a url!
                </h5>
                {/* <div id="field-maker">
                  <label className="form-group form-row" htmlFor="fieldname">
                    <input
                      type="text"
                      name="fieldname"
                      id="fieldname"
                      placeholder="Field name (eg.: First name)"
                      className="form-control form-control-sm rounded-corners col-md-5"
                    />

                    <select
                      name="fieldtype"
                      id="fieldtype"
                      className="form-control form-control-sm rounded-corners col-md-5"
                    >
                      <option value="">---Select the field type---</option>
                      <option value="short-text">Short text (like names)</option>
                      <option value="long-text">Long text (like Explanation)</option>
                      <option value="multiple-choices">
                      Multiple choice (one answer is valid)</option>
                      <option value="check-boxes">Checkboxes (many Qs are valid)</option>
                      <option value="dropdown-list">Dropdown list</option>
                      <option value="date">Date (eg.: 01/01/1999)</option>
                      <option value="time">Time (eg.: 8:02 am)</option>
                    </select>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info rounded-corners col-md-2"
                      id="save-field-btn"
                    >
                      <FaPlus />
                    </button>
                  </label>


                </div> */}

              </div>
              <div>

                <button
                  type="button"
                  className="btn btn-block btn-sm btn-primary"
                  id="send-msg-btn"
                  onClick={() => handleSaveJobBtnClicked(this.state.necessaryFields)}
                >
                  <span id="spinner-border" />
                  <span id="span-save-job" className="text-17">Save job details</span>
                  <span id="spinner-grow" />
                  <span id="spinner-grow" />
                  <span id="spinner-grow" />
                </button>
              </div>
            </div>
          </div>
          {/** EMAIL RESULTS DIV */}
          <div
            id="save-jobdetails-result-div"
            className="mt-5 heigth-80 overflow-auto width-80 color-grey-transparent p-2 hidden-div"
          >
            <div
              className="padding-15 width-40 color-dark-purple text-17 text-center"
              id="save-jobdetails-result-div-container"
            />
            <div className="form-group form-row">
              <div className="col-md-6">
                <button
                  onClick={() => handleJobDetailsEditorsInitialize(this.state.necessaryFields)}
                  type="button"
                  className="btn btn-primary rounded-corners"
                >
                  Do you want to post another job?
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-danger rounded-corners"
                >
                  Go back to your profile
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
