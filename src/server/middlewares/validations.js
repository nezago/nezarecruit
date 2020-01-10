import { validateEmail, validatePassword, validateFname } from '../../helpers/functions/validations';
import connect from '../models/db/settings/connectToDb';
import { CHECK_USER_ID_FROM_TABLE_USERS } from '../models/db/settings/SQLqueries';


/**
 *====================================================================================
 *====================================================================================
 *====================================USERS===========================================
 *====================================================================================
 *====================================================================================
 */
export const validateSignup = (req, res, next) => {
  const {
    useridcardid,
    fname,
    dateofbirth,
    email,
    password,
  } = req.body;

  if (!validateFname(fname)) {
    res.status(400).send('Your familly name has illegal characters!');
  } else if (dateofbirth.length === 0) {
    res.status(400).send('Please enter your date of birth!');
  } else if (!validateEmail(email)) {
    res.status(400).send('The email you are saving is invalid!');
  } else if (!validatePassword(password, email)[1]) {
    res.status(400).send(validatePassword(password, email)[0]);
  } else if (useridcardid) {
    connect().query(CHECK_USER_ID_FROM_TABLE_USERS, [useridcardid], (err, result) => {
      if (err) {
        res.status(500).send({
          isUserVerifiedFromDb: false,
          info: `<span class="text-danger">Sorry! Failed to check you from our databases,
          please refersh the page and try again!</span>`,
        });
      } else if (result) {
        if (!result.rows[0].exists) {
          res.status(400).send({
            isUserVerifiedFromDb: true,
            info: `<span class="text-danger">Sorry! You are trying to register,
            but your id card number seems to miss from our databases</span>`,
          });
        } else {
          next();
        }
      }
    });
  }
};

/** VALIDATION OF LOGIN */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email) {
    if (validateEmail(email)) {
      if (password) {
        next();
      } else {
        res.status(400).send('Enter your password!');
      }
    } else {
      res.status(400).send('The email you are trying to use, is invalid!');
    }
  } else {
    res.status(400).send('Enter your Email please!');
  }
};

/**
 * ===================================================================================
 * ===================================================================================
 * ==================================USER ID CARDNUMBERS==============================
 * ===================================================================================
 * ===================================================================================
 */

export const validateUserIdCardNumber = (req, res, next) => {
  const {
    userfname,
    useridcardnumber,
    userauthorities,
  } = req.body;

  if (userfname) {
    if (useridcardnumber) {
      if (userauthorities) {
        next();
      } else {
        res.status(400).send({
          isUserIdSaved: false,
          info: '<span class="text-danger">Select one of the authorities</span>',
        });
      }
    } else {
      res.status(400).send({
        isUserIdSaved: false,
        info: '<span class="text-danger">Enter a user ID Card number</span>',
      });
    }
  } else {
    res.status(400).send({
      isUserIdSaved: false,
      info: '<span class="text-danger">Enter a user first name</span>',
    });
  }
};

/**
 *================================================================================================
 *================================================================================================
 * ==============================================APPLICATIONS=====================================
 * ===============================================================================================
 * ===============================================================================================
 */
export const validateApplicationForm = (req, res, next) => {
  const {
    fname,
    educationlevel,
    codingexperience,
    currentlyemployed,
    yearofbirth,
    email,
  } = req.body;

  if (!validateFname(fname)) {
    res.status(400).send('Your application is not accepted, because your familly name contains illegal characters!');
  } else if (educationlevel.length < 1) {
    res.status(400).send('You must precise your education level');
  } else if (codingexperience.length === 0) {
    res.status(400).send('The year of your pragramming start is invalid!');
  } else if (currentlyemployed.length < 1) {
    res.status(400).send('You must precise if you are currently employed or not');
  } else if (parseInt(yearofbirth) < 1969 || parseInt(yearofbirth) > 2001) {
    res.status(400).send('Your age is not eligible to apply for this job');
  } else if (!validateEmail(email)) {
    res.status(400).send('The email you put is invalid');
  } else {
    next();
  }
};

/**
 * ========================================================================================
 * ========================================================================================
 * ==============================VALIDATE JOBS=============================================
 * ========================================================================================
 * ========================================================================================
 */
export const validateJob = (req, res, next) => {
  const {
    jobtitle,
    companyname,
    companyemail,
    jobcreatoremail,
    jobdeadline,
    isJobValid,
  } = req.body;
  if (jobtitle.length === 0) {
    res.status(400).send(`<span class="text-danger">
    You must precise your job title</span>    `);
  } else if (companyname.length === 0) {
    res.status(400).send(`<span class="text-danger">
    Enter your company name</span>`);
  } else if (!validateEmail(companyemail)) {
    res.status(400).send(`<span class="text-danger">
    Enter your company email</span>`);
  } else if (!validateEmail(jobcreatoremail)) {
    res.status(400).send(`<span class="text-danger">
    Enter your email</span>`);
  } else if (jobdeadline.length === 0) {
    res.status(400).send(`<span class="text-danger">
    Enter your job deadline</span>`);
  } else if (!isJobValid) {
    res.status(400).send(`<span class="text-danger>
    Your job post is invalid because you didn't enter job description
    and a custom email to send to the applicant, so please fill the form carefully
    and resend your job</span>`);
  } else {
    next();
  }
};

/**
 * ==============================================================================
 * ==============================================================================
 * ===============================VALIDATE USER LOGS=============================
 * ==============================================================================
 * ==============================================================================
 */

export const validateUserLog = (req, res, next) => {
  const {
    userid, useraction,
  } = req.body;

  if (userid) {
    if (userid) {
      connect().query(CHECK_USER_ID_FROM_TABLE_USERS, [parseInt(userid)], (err, result) => {
        if (err) {
          res.status({
            isUserVerifiedFromDb: false,
            info: `<span class="text-danger">Sorry! Something wrong occured, 
          so please refresh the browser and try again!</span>`,
          });
        } else if (result) {
          if (result.rows[0].exists) {
            res.status(200).send({
              isUserVerifiedFromDb: true,
              info: '<span class="text-success">The user exists in our database</span>',
            });
            /** CHECKING IF THE USER_ACTION IS NOT EMPTY */
            if (useraction) {
              next();
            } else {
              res.status(400).send({
                isUserLogValid: false,
                info: '<span class="text-danger">Sorry! The user log is not well captured</span>',
              });
            }
          } else {
            res.status(404).send({
              isUserVerifiedFromDb: true,
              info: '<span class="text-danger">Sorry, this user doesn\'t exist in our databases</span>',
            });
          }
        } else {
          res.status(500).send({
            isUserVerifiedFromDb: false,
            info: '<span class="text-danger">Sorry! Failed to verify a user from the database</span>',
          });
        }
      });
    }
  } else {
    res.status(400).send({
      isUserVerifiedFromDb: false,
      info: '<span class="text-danger">Failed to get user-id, you can refresh the browser, and try again!</span>',
    });
  }
};
