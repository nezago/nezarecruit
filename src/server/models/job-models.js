
import nodemailer from 'nodemailer';
import connect from './db/settings/connectToDb';
import {
  ADDDING_NEW_JOB_TMP,
  ADD_NEW_INITIAL_EMAIL_STATUS,
  GET_ALL_JOBS_TMP,
  ADD_NEW_APPLICATION_FORM_URL,
  GETT_ALL_APPLICATION_FORM_URLS,
  CHECK_IF_APPLICATION_FORM_URL_EXISTS,
} from './db/settings/SQLqueries';
import { saveEmailInDB } from './apply-models';


/** APPLICATION FORMS */
export const addNewApplicationFormUrl = (req, res, next) => {
  const {
    applicationformurl,
  } = req.body;

  if (applicationformurl && applicationformurl.length !== 0) {
    connect().query(ADD_NEW_APPLICATION_FORM_URL, [applicationformurl], (err, results) => {
      if (err) {
        res.status(500).send({
          isSavedSuccess: false,
          info: `<span class="text-danger">
        Failed to save ${applicationformurl} in our database
        </span>
        `,
        });
      } else if (results.rowCount === 1) {
        res.status(201).send({
          isSavedSuccess: true,
          info: `<span class="text-success">
          ${applicationformurl} is saved successfully in our database, now you can add it on the job details</span>`,
        });
        next();
      }
    });
  } else {
    res.status(500).send(
      {
        isSavedSuccess: false,
        info: '<span class="text-danger">It seems the url is empty</span>',
      },
    );
  }
};

export const getAllApplicationFormUrls = (req, res, next) => {
  connect().query(GETT_ALL_APPLICATION_FORM_URLS, (err, results) => {
    if (err) {
      res.status(500).send({
        isRetrieved: false,
        results: `
      <span class="text-danger">Sorry, retrieving all saved application-form-urls failed,
       please refresh the page and try again</span>
      `,
      });
    } else if (results) {
      res.status(200).send({ isRetrieved: true, results: results.rows });
      next();
    }
  });
};

export const checkIfApplicationFormUrlIsRegistered = (req, res, next) => {
  const { applicationformurl } = req.body;
  if (applicationformurl.length !== 0) {
    connect().query(CHECK_IF_APPLICATION_FORM_URL_EXISTS, [applicationformurl], (err, result) => {
      if (err) {
        res.status(500).send({
          isChecked: false,
          info: '<span class="text-danger">Checking failed</span>',
        });
      } else if (result) {
        if (result.rows[0].exists) {
          res.status(200).send({
            isChecked: true,
            info: `<span class="text-danger">The url: ${applicationformurl} is already registered</span>`,
            resultsFromDb: result.rows[0].exists,
          });
        } else if (!result.rows[0].exists) {
          res.status(200).send({
            isChecked: true,
            info: `<span class="text-success">Make sure that the ${applicationformurl} url is valid
            and hit save button</span>`,
            resultsFromDb: result.rows[0].exists,
          });
        }
        next();
      }
    });
  }
};

/** JOBS */
export const addNewJob = (req, res, next) => {
  const {
    jobtitle,
    jobdescription,
    companyname,
    companyemail,
    jobcreatoremail,
    jobdeadline,
    customemailmsgtoapplicant,
    jobrequirements,
    applicationformurl,
  } = req.body;
  connect().query(
    ADDDING_NEW_JOB_TMP,
    [jobtitle, companyname, companyemail, jobcreatoremail, jobdeadline,
      jobdescription, customemailmsgtoapplicant, jobrequirements, applicationformurl],
    (err, results) => {
      if (err) {
        res.status(500).send(`<span class="text-danger">
           Ooops! Something unexpected occured! so please refresh and refill the form</span>`);
      } else if (results.rowCount === 1) {
        /** preparing email to send */
        const htmlToSend = `
        <div>
        
          <p>Thank you for creating a job offer on nezarecruit platform we are making a movement 
          of changing our African world. Nezarecruit platform is created to be a hub between 
          organizations and compentent personnels!
          
          <p>
          We help organizations, institutions (public, or private), companies, ... to get 
          competent and skillful personels. We are happy that you are apart of our clients
          and your success matters to us. We will contact you very soon, to let you know 
          the matches for what you have specified in your job details!

          Thank you!
          </p>
          <hr/>
          NezaRecruit Team<br/>
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
          to: `${companyemail},${jobcreatoremail}`,
          subject: 'Job creation feedback at nezarecruit',
          html: htmlToSend,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            connect().query(ADD_NEW_INITIAL_EMAIL_STATUS,
              (erroe, state) => {
                if (erroe) {
                  res.status(201).send(`
                    <span class="text-danger">
                    <p>
                    Your job creation has been accepted and saved
                    in our databases, so please contact us on recruit.neza@gmail.com in no more
                    than 72 hours.</p>
                    
                    <p>
                    We haighly recommend you that you contact us, if not, your job creation
                    will not be considered, Yours faithfully!

                    Thank you!
                    </p>

                    `);
                  next();
                } else if (state.rowCount === 1) {
                  res.status(201).send(`
                    <span class="text-danger>
                    <p>
                    Congratulations! Your job details has been accepted,
                    and saved in our databases, but our servers were not able to send you email feedback to your address, 
                  so please be patient, and check your email in 72 hours, our team is preparing you
                  a feedback email, it will be sent to you on ${jobcreatoremail} for your personal
                  and we will send it on the ${companyemail} for notifying your bosses that you accomplished
                  the mission!</p>

                    <p>We will do this in no more than 72 hours!
                    <br/>
                    Thank you!
                    </p>
                    </span>`);
                  next();
                }
              });
          } else if (info) {
            const emailAddr = `[${jobcreatoremail}, ${companyemail}]`;
            const emailSubj = `Job Created by ${jobcreatoremail}`;
            const senderEmailAddr = 'recruit.neza@gmail.com';
            saveEmailInDB(emailAddr, emailSubj, senderEmailAddr,
              htmlToSend);// saving the sent email into the db
            res.status(200).send(
              `
                  <span class="text-success">
                  Congratulations! Your job offer is saved successfully, and we have 
                  sent an email to you and to your company about the feedback!</span>
                 `,
            );
            next();
          }
        });
      }
    },
  );
};

export const getAllJobs = (req, res, next) => {
  connect().query(GET_ALL_JOBS_TMP, (err, results) => {
    if (err) {
      res.status(500).send(`<span class="text-danger">
      Sorry! Something strange occured, try again!</spna>`);
    } else if (results) {
      res.status(200).send(results.rows);
      next();
    }
  });
};
