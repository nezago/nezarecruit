import nodemailer from 'nodemailer';
import connect from './db/settings/connectToDb';
import { ADD_NEW_APPLICATION } from './db/settings/SQLqueries';

export const addApplicationForm = (req, res, next) => {
  const {
    fname,
    midname,
    lname,
    gender,
    countryresidence,
    educationlevel,
    graduationyear,
    fieldofstudy,
    employedbefore,
    jobposition,
    startedprogrammingyear,
    currentlyemployed,
    dateofbirth,
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
      countryresidence,
      educationlevel,
      parseInt(graduationyear),
      fieldofstudy,
      employedbefore,
      jobposition,
      parseInt(startedprogrammingyear),
      currentlyemployed,
      dateofbirth,
      email,
      phonenumber,
      linkedinprofile,
    ], (err, results) => {
      if (err) {
        res.status(500).send('Something unexpected occured, try again!');
        process.exit(0);
      }
      if (results.rowCount === 1) {
        const htmlToSend = `
        <p>Dear <strong>${fname}</strong>, thank you to apply for joining neza group 
        new era of top talented African Software Engineers movement. This is the 
        begining of your career, below are steps to follow.</p>
        <h2>Action needed</h2>
        <p>To apply is the first step you completed successfully, The steps ahead requires you to 
        hardwork to prove yorself that you are worth to join this movement.</p>
        
        <h3>Link</h3>
        <p>Go to https://nezado.herokuapp.com/ to follow all you need to know inorder to join!</p>
        <hr/>
        Neza Group Top Talent recruitment Team<br/>
        Mobile : +250722792371<br/>
        Gisenyi - Rubavu - Rwanda
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
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else if (info) {
            console.log(`Email sent : ${info}`);
          }
        });

        res.status(201).send(`Your application is accepted and we have sent an email on ${email},
         please check your email and follow instructions!`);
        next();
      }
    });
};
export const checkEmailFromApplications = () => { };
