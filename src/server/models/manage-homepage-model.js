import { validateEmail } from '../../helpers/functions/validations';
import connect from './db/settings/connectToDb';
import { ADD_NEW_MANAGE, GET_ALL_MANAGES } from './db/settings/SQLqueries';

/** ADDING NEW MANAGE */
export const addNewManageHomepage = (req, res, next) => {
  const {
    isRequestValid,
    whatNezarecruitContent,
    whyNezarecruitContent,
    manageCreatorEmail,
  } = req.body;
  if (!validateEmail(manageCreatorEmail)) {
    res.status(400).send(`
    <span class="text-danger">
      Your email is not well captured by the system, so please refresh the page and try again!
    </span>`);
  } else if (!isRequestValid) {
    res.status(400).send(`
    <span class="text-danger">
      You must create either a what-nezarecruit or a why-nezarecruit!
    </span>`);
  } else {
    connect().query(ADD_NEW_MANAGE,
      [whatNezarecruitContent, whyNezarecruitContent, manageCreatorEmail], (err, results) => {
        if (err) {
          res.status(500).send(`
          <span class="text-danger">
            There is something unxpected occured, so we couldn't update our manage-database, please 
              refresh the page and try again!
          </span>
          `);
        } else if (results.rowCount === 1) {
          res.status(200).send(`
          
          <span class="text-green">
            Your manage is created successfully, and it published on the homepage, thank you!
          </span>`);
          next();
        }
      });
  }
};

/** GETTING ALL MANAGES */
export const getAllManages = (req, res, next) => {
  connect().query(GET_ALL_MANAGES, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).send(results.rows);
      next();
    }
  });
};
