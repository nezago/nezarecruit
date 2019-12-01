/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  handleFnameTyping,
  displayYearOfBirth,
  displayNationality,
  displyEducationLevels,
  displayOptionsOfStudy,
  displayCodingExperience,
  handleEmailTyping,
  handleTyping,
} from '../../helper-functions/handlers';
import { checkEmailFromBb } from '../../actions/retrieveDataFromDb';

class SoftwareDevFormApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
    };
    this.props = {
      checkEmailFromBb: PropTypes.func.isRequired,
      dataFromDb: PropTypes.object.isRequired,
    };
  }

  componentDidMount() {
    const fields = {
      emailError: document.getElementById('emailError'),
      emailField: document.getElementById('email'),
      emailChecking: document.getElementById('emailChecking'),
      fnameField: document.getElementById('fname'),
      fnameError: document.getElementById('fnameError'),
      yearofbirthField: document.getElementById('yearofbirth'),
      yearofbirthError: document.getElementById('yearofbirthError'),
      nationalityField: document.getElementById('nationality'),
      nationalityError: document.getElementById('nationalityError'),
      educationlevelField: document.getElementById('educationlevel'),
      educationlevelError: document.getElementById('educationlevelError'),
      optionofstudyField: document.getElementById('optionofstudy'),
      optionofstudyError: document.getElementById('optionofstudyError'),
      codingexperienceField: document.getElementById('codingexperience'),
      codingExperienceError: document.getElementById('codingExperienceError'),
    };
    this.setState({ fields });
    displayNationality(fields);
    displayOptionsOfStudy(fields);
    displayYearOfBirth(fields);
    displyEducationLevels(fields);
    displayCodingExperience(fields);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { dataFromDb } = nextProps;
      if (dataFromDb) {
        const { isEmailExistsFromDatabase } = dataFromDb;
        const emailError = document.getElementById('emailError');
        const emailChecking = document.getElementById('emailChecking');
        if (isEmailExistsFromDatabase) {
          emailError.innerHTML = 'Hey! Your email is being used by someone else on our systems, so please use another email, otherwise your application will be rejected!';
          emailChecking.classList.add('hidden-div');
        } else {
          emailError.innerHTML = '';
          emailChecking.classList.add('hidden-div');
        }
      }
    }
  }

  render() {
    const { checkEmailFromBb } = this.props;
    const { fields } = this.state;
    return (
      <main
        id="applicationFormDiv"
        className="shadows mb-5 mt-5 width-98 text-white black-bordered-element black-transparent-element rounded-corners padding-15"
      >
        <form>
          <div className="application-form width-50">
            <div>
              <h3 className="text-center text-success">Fill this form, and then click on send Application</h3>

              {/** Family name */}
              <label
                htmlFor="fname"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Family name :</span>

                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="eg.: KAMIKAZI"
                  className="form-control-sm form-control rounded-corners col-md-8"
                  onInput={() => handleFnameTyping(fields, this)}
                />
              </label>

              {/** If family name has an error, the error appears here */}
              <div className="text-center text-danger">
                <span id="fnameError" />
              </div>


              {/** MIDDLE NAME PORTION */}
              <label
                htmlFor="midname"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Middle name :</span>

                <input
                  type="text"
                  name="midname"
                  id="midname"
                  placeholder="eg.: Anne"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onInput={() => handleTyping(event, this)}
                />
              </label>


              {/** LAST NAME PORTION */}

              <label
                htmlFor="lname"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Last name :</span>

                <input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="eg.: Maria"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onInput={() => handleTyping(event, this)}
                />
              </label>


              {/** GENDER PORTION */}

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="form-group form-row">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="col-md-4 custom-control custom-radio custom-control-inline">
                  Gender :
                </label>

                <label htmlFor="female" className="hand-cursor">
                  <span className="col-md-2">Female</span>
                  <input type="radio" name="gender" value="F" id="female" />
                  onChange=
                  {() => handleTyping(event, this)}
                </label>
                <label htmlFor="male" className="hand-cursor">
                  <span className="col-md-2">Male</span>
                  <input type="radio" name="gender" value="M" id="male" />
                  onChange=
                  {() => handleTyping(event, this)}
                </label>
              </label>


              {/** YEAR OF BIRTH PORTION */}
              <label
                htmlFor="yearofbirth"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Year of birth :</span>
                <select
                  name="yearofbirth"
                  id="yearofbirth"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                >
                  <option value="" disabled selected>---select your year of birth---</option>
                </select>
              </label>
              <div>
                <span id="yearofbirthError" />
              </div>

              {/** NATIONALITY PORTION */}
              <label
                htmlFor="nationality"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Nationality :</span>
                <select
                  name="nationality"
                  id="nationality"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                >
                  <option value="" disabled selected>---select your nationality---</option>
                </select>
              </label>
              <div>
                <span id="nationalityError" />
              </div>

              {/** EDUCATION LEVEL PORTION */}
              <label
                htmlFor="educationlevel"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Education level :</span>
                <select
                  name="educationlevel"
                  id="educationlevel"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                >
                  <option value="" disabled selected>---select your educationlevel---</option>
                </select>
              </label>
              <div>
                <span id="educationLevelError" />
              </div>

              {/** FIELD OF STUDY PORTION */}
              <label
                htmlFor="optionofstudy"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Option of study :</span>
                <select
                  name="optionofstudy"
                  id="optionofstudy"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                >
                  <option value="" disabled selected>---select your option of study---</option>
                </select>
              </label>
              <div>
                <span id="optionOfStudyError" />
              </div>

              {/** EPLOYMENT HISTORY PORTION */}

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="form-group form-row">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="col-md-4 custom-control custom-radio custom-control-inline">
                  Employed before? :
                </label>

                <label htmlFor="yesEmployedBefore" className="hand-cursor">
                  <span className="col-md-2">Yes</span>
                  <input type="radio" name="employedbefore" value="Yes" id="yesEmployedBefore" />
                </label>
                <label htmlFor="notEmployedBefore" className="hand-cursor">
                  <span className="col-md-2">No</span>
                  <input type="radio" name="employedbefore" value="No" id="notEmployedBefore" />
                </label>
              </label>

              {/** employment job positon portion */}
              <label
                htmlFor="jobposition"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">What was your job position ? :</span>

                <input
                  type="text"
                  name="jobposition"
                  id="jobposition"
                  placeholder="eg.: Senior Software developer"
                  className="form-control-sm form-control rounded-corners col-md-8"
                />
              </label>

              {/** CURRENTLY EMPLOYED PORTION */}

              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="form-group form-row">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="col-md-4 custom-control custom-radio custom-control-inline">
                  Are you still working ? :
                </label>

                <label htmlFor="yesStillWorking" className="hand-cursor">
                  <span className="col-md-2">Yes</span>
                  <input type="radio" name="currentlyemployed" value="Yes" id="yesStillWorking" />
                </label>
                <label htmlFor="notStillWorking" className="hand-cursor">
                  <span className="col-md-2">No</span>
                  <input type="radio" name="currentlyemployed" value="No" id="notStillWorking" />
                </label>
              </label>

              {/** CODING EXPERIENCE */}
              <label
                htmlFor="codingexperience"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Coding experience :</span>
                <select
                  name="codingexperience"
                  id="codingexperience"
                  className="custom-select custom-select-sm rounded-corners col-md-8"
                >
                  <option value="" disabled selected>---select your coding experience---</option>
                </select>
              </label>
              <div>
                <span id="codingExperienceError" />
              </div>

              {/** EMAIL PORTION */}

              <label
                htmlFor="email"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4">Email :</span>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="eg.: you@nezado.com"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                  onInput={() => handleEmailTyping(fields, checkEmailFromBb)}
                />
              </label>

              <div className="text-center text-danger">
                <span id="emailError" />
              </div>
              <div className="text-center hidden-div" id="emailChecking">
                <button type="button" className="btn btn-sm btn-primary rounded-corners">
                  <span className="spinner-border spinner-border-sm text-warning" />
                  {'  '}
                  Checking your email from our databases ...
                  {'  '}
                  <span className="spinner-grow spinner-grow-sm text-warning" />
                </button>
              </div>


              { /** PHONE NUMBER PORTION */}
              <label
                htmlFor="phonenumber"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4"> Phone number :</span>

                <input
                  type="phonenumber"
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="eg.: myphonenumber"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                />
              </label>

              <div className="text-center text-danger">
                <span id="phonenumberError" />
              </div>


              {/** LINKEDIN PORTION */}

              <label
                htmlFor="linkedinprofile"
                className="hand-cursor form-group form-row"
              >
                <span className="col-md-4"> LinkedIn profile URL :</span>

                <input
                  type="text"
                  name="linkedinprofile"
                  id="linkedinprofile"
                  placeholder="eg.: https://www.linkedin.com/in/mugirase-emmanuel-a90b49143/"
                  className="col-md-8 form-control-sm form-control rounded-corners"
                />
              </label>

              <div className="text-center text-danger">
                <span id="linkedinprofileError" />
              </div>

              <button
                type="button"
                className="col-md-12 btn btn-block btn-info btn-sm rounded-corners"
              >
                Send Application
              </button>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  dataFromDb: state.myReducers,
});
export default connect(mapStateToProps, { checkEmailFromBb })(SoftwareDevFormApply);
