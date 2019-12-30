import nodemailer from 'nodemailer';
import connect from './db/settings/connectToDb';
import {
  ADD_NEW_APPLICATION,
  ADD_NEW_INITIAL_EMAIL_STATUS,
  CHECK_EMAIL_FROM_TABLE_APPLICATIONS,
  GET_ALL_APPLICATIONS,
  UPDATE_READ_IN_TABLE_APPLICATION,
  GET_UNSENT_INITIAL_EMAIL,
  UPDATE_REPLIED_IN_TABLE_APPLICATION,
  ADD_NEW_SENT_EMAIL,
  GET_ALL_SENT_EMAILS,
  DELETE_UNSENT_INITIAL_EMAIL_AFTER_REPLYING,
} from './db/settings/SQLqueries';
import { checkIfEmailExistFromTableUsers } from './users-model';
import { validateEmail } from '../../helpers/functions/validations';

/** SAVING EMAILS IN DATABASE */
export const saveEmailInDB = (emailAddr, emailSubj, senderEmailAddress, emailMsg) => {
  if (emailAddr.length !== 0 && emailSubj) {
    connect().query(ADD_NEW_SENT_EMAIL,
      [emailAddr, emailSubj, senderEmailAddress, emailMsg]);
  }
};
/** ADDING A NEW APPLICATION */
export const addApplicationForm = async (req, res, next) => {
  const {
    fname,
    midname,
    lname,
    gender,
    nationality,
    educationlevel,
    optionofstudy,
    employedbefore,
    jobposition,
    codingexperience,
    currentlyemployed,
    yearofbirth,
    email,
    phonenumber,
    linkedinprofile,
  } = req.body;

  connect().query(ADD_NEW_APPLICATION,
    [
      fname,
      midname,
      lname,
      gender,
      nationality,
      educationlevel,
      optionofstudy,
      employedbefore,
      jobposition,
      codingexperience,
      currentlyemployed,
      parseInt(yearofbirth),
      email,
      phonenumber,
      linkedinprofile,
    ], (err, results) => {
      if (err) {
        res.status(500).send(`name : ${err.name}, details: ${err.detail}`);
        process.exit(0);
      }
      if (results.rowCount === 1) {
        /** THE FOLLOWING CODE DESCRIBING WHAT HAPPENS IF THE APPLICATION IS SAVED SUCCESSFULLY */
        /** PREPARING EMAIL THINGS */
        const htmlToSend = `
        <div>
        
          <p>Dear <strong>${fname}</strong>, thank you to apply for joining neza group 
          new era of top talented African Software Engineers movement. This is the 
          begining of your career, below are steps to follow.</p>
          <h2>Action needed</h2>
          <p>To apply is the first step you completed successfully, The steps ahead requires you to 
          hardwork to prove yorself that you are worth to join this movement.</p>
          
          <h3>Link</h3>
          <p>Go to <a href="http://bit.ly/neza-go-to-learn" target="_blank">Neza softwares curriculum</a> 
          to follow all you need to know inorder to join!</p>
          <hr/>
          Neza Group Top Talent recruitment Team<br/>
          Mobile : +250722792371<br/>
          Gisenyi - Rwanda

        </div>
          `;

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'recruit.neza@gmail.com',
            pass: 'Nezagroup1.',
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const mailOptions = {
          from: 'recruit.neza@gmail.com',
          to: email,
          subject: 'Your current application process status',
          html: htmlToSend,
        };

        /** SENDING EMAIL */
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            /** THIS CODES WILL RUN IF EMAIL FAILED TO BE SENT */
            connect().query(ADD_NEW_INITIAL_EMAIL_STATUS, [email, false, error],
              (statusErroe, statusResult) => {
                if (statusErroe) {
                  res.status(201).send(`Dear ${fname} your application has been accepted,
                  but our server experienced a problem to track your email address, this means 
                  that we have difficult in contacting you through your email address, 
                  so please contact us on recruit.neza@gmail.com in no more than 72 hours, 
                  Note that if you don't contact us within that 72 hours, your application may
                  be rejected!`);
                  next();
                } else if (statusResult.rowCount === 1) {
                  res.status(201).send(`Dear ${fname} your application has been accepted,
                  but our server experienced a problem to track your email address, this means 
                  that we have difficult in contacting you through your email address, 
                  so please be patient, and check your email in 72 hours, our team is preparing you
                  a feedback email, it will be sent to you on ${email} in no more than 72 hours!`);
                  next();
                }
              });
          } else if (info) {
            /** THESE CODES WILL RUN IF EMAIL HAS BEEN SEND SUCCESSFULLY */
            res.status(201).send(`

            <div class="text-center">
            <h3 class="text-success">Feedback</h3>

            <p>Congratulations dear <strong>${fname}</strong>, your application has been accepted,
            and we sent you an email on <em>${email}</em>, which informs you about the remaining 
            process to follow, please be as regular as possible, and don't miss any step!</p>

            <p>If you have trouble to get it in your inbox, please check your spam box, and mark it
            as a trusted email, for the sake of the future simplicity of our communication to you!</p>

            <p>Any inquiry yo have, please don't hesitate to email us on recruit.neza@gmail.com</p>
            </div>
            `);
            saveEmailInDB(email,
              'Your current application process status',
              'recruit.neza@gmail.com', htmlToSend);
            next();
          }
        });
      }
    });
};

/** SENDING EMAIL TO APPLICANTS */
export const sendEmail = (req, res, next) => {
  const {
    emailAddr,
    emailSubject,
    senderEmailAddress,
    emailMsg,
  } = req.body;
  if (!validateEmail(emailAddr)) {
    res.status(400).send(`
    <span class='text-danger'>
    The recipient email is not well caught, so please refresh the browser and resend the email
    </span>`);
  } else if (!emailSubject) {
    res.status(400).send({
      isEmailSent: false, message: `<span class='text-danger'>
    You cannot send an email with no subject, so please write something to send!</span>`,
    });
  } else {
    /* These codes will run when there is email address and email message */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'recruit.neza@gmail.com',
        pass: 'Nezagroup1.',
      },
      tls: { rejectUnauthorized: false },
    });
    const mailOptions = {
      from: 'recruit.neza@gmail.com',
      to: emailAddr,
      subject: emailSubject,
      html: emailMsg,
    };
    transporter.sendMail(mailOptions, (err, results) => {
      if (err) {
        res.status(500).send({
          isEmailSent: false,
          message: `<span class='text-danger'>The email is not sent, 
          the problem is not you, is us, our servers couldn't 
          send it, so please try again!</span>`,
        });
      } else if (results) {
        saveEmailInDB(emailAddr, emailSubject, senderEmailAddress, emailMsg);
        res.status(200).send({
          isEmailSent: true,
          message: `
        <span class='text-success'>Your email sent successfully and saved in the database
        this means, if a user is claiming that he/she didn't receive this email, you can get it
        back from our databases, enjoy your recruiting process!
        </span> `,
        });
        next();
      }
    });
  }
};

/** CHECKING THE EXISTANCE OF THE EMAIL FROM THE DATABASE */
export const checkEmailFromApplicationsAndUsers = (req, res, next) => {
  const { email } = req.body;
  connect().query(CHECK_EMAIL_FROM_TABLE_APPLICATIONS, [email], (err, results) => {
    if (err) {
      res.status(500).send(`Sorry, the server failed to check ${email} from the database, try again`);
      process.exit(0);
    } else if (results.rows[0].exists) {
      res.status(200).send(results.rows[0].exists);
    } else {
      checkIfEmailExistFromTableUsers(req, res, next);
    }
  });
};

/** GETTING ALL THE APPLICATIONS REGISTERED */
export const getAllApplications = (req, res, next) => {
  connect().query(GET_ALL_APPLICATIONS, (err, results) => {
    if (err) {
      res.status(500).send('Sorry! Something unexpected occured, please try again later!');
    }
    res.status(200).send(results.rows);
    next();
  });
};

/** UPDATING READ FROM TABLE APPLICATIONS */
export const updateReadInTableApplications = (req, res, next) => {
  const { application_id } = req.body;
  if (application_id) {
    connect().query(UPDATE_READ_IN_TABLE_APPLICATION, [application_id],
      (err, results) => {
        if (err) {
          res.status(500).send('Something wrong occurred, please try again!');
        } else {
          res.status(200).send(results);
          next();
        }
      });
  }
};

export const updateRepliedInTableApplications = (req, res, next) => {
  const { email, status } = req.body;
  if (email) {
    connect().query(UPDATE_REPLIED_IN_TABLE_APPLICATION, [status, email],
      (err, results) => {
        if (err) {
          res.status(500).send('Something wrong occurred, please try again!');
        } else {
          if (status) {
            connect().query(DELETE_UNSENT_INITIAL_EMAIL_AFTER_REPLYING, [email]);
          }
          res.status(200).send(results);
          next();
        }
      });
  }
};

/** GETTING UNSENT EMAIL ADDRESS */
export const getUnsentEmailAddress = (req, res, next) => {
  connect().query(GET_UNSENT_INITIAL_EMAIL, (err, results) => {
    if (err) {
      res.status(500).send('<span class="text-danger">Unknown error, try again!</span>');
    } else {
      res.status(200).send(results.rows);
      next();
    }
  });
};

/** GETTING ALL SENT EMAILS */
export const getAllSentEmails = (req, res, next) => {
  connect().query(GET_ALL_SENT_EMAILS, (err, results) => {
    if (err) {
      res.status(500).send('<span class="text-danger">Unknown error occured, please refresh the page!</span>');
    } else {
      res.status(200).send(results.rows);
      next();
    }
  });
};
