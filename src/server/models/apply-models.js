import nodemailer from 'nodemailer';
import connect from './db/settings/connectToDb';
import {
  ADD_NEW_APPLICATION,
  ADD_NEW_INITIAL_EMAIL_STATUS,
  CHECK_EMAIL_FROM_TABLE_APPLICATIONS,
  GET_ALL_APPLICATIONS,
} from './db/settings/SQLqueries';
import { checkIfEmailExistFromTableUsers } from './users-model';

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
          <p>Dear <strong>${fname}</strong>, thank you to apply for joining neza group 
          new era of top talented African Software Engineers movement. This is the 
          begining of your career, below are steps to follow.</p>
          <h2>Action needed</h2>
          <p>To apply is the first step you completed successfully, The steps ahead requires you to 
          hardwork to prove yorself that you are worth to join this movement.</p>
          
          <h3>Link</h3>
          <p>Go to http://bit.ly/neza-go-to-learn to follow all you need to know inorder to join!</p>
          <hr/>
          Neza Group Top Talent recruitment Team<br/>
          Mobile : +250722792371<br/>
          Gisenyi - Rwanda
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

            <div className="text-center">
            <h3>Feedback</h3>

            <p>Congratulations dear <strong>${fname}</strong>, your application has been accepted,
            and we sent you an email on <em>${email}</em>, which informs you about the remaining 
            process to follow, please be as regular as possible, and don't miss any step!</p>
            </div>
            `);
            next();
          }
        });
      }
    });
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
