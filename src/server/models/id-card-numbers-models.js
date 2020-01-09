import connect from './db/settings/connectToDb';
import {
  ADD_NEW_USER_ID_CARD_NUMBER,
  GET_ALL_USERS_ID_CARD_NUMBERS,
  GET_PARTICULAR_ID_CARD_NUMBER_BY_ID_CARD_NUMBER,
  CHECK_IF_ID_CARD_NUMBER_EXISTS,
} from './db/settings/SQLqueries';

export const addNewIdCardNumber = (req, res, next) => {
  const {
    userfname,
    usermidname,
    userlname,
    useridcardnumber,
    userauthorities,
    addedbyemail,
  } = req.body;
  connect().query(ADD_NEW_USER_ID_CARD_NUMBER,
    [userfname, usermidname, userlname, useridcardnumber, userauthorities, addedbyemail],
    (err, result) => {
      if (err) {
        res.status(500).send({
          isUserIdSaved: false,
          info: '<span class="text-danger">Something wrong occured, refresh the page and try again!</span>',
        });
      } else if (result) {
        res.status(201).send({
          isUserIdSaved: true,
          info: `<span class="text-success">The user you were trying to create, 
          was created successfully, now he/she can go and register
          <a href="/enter-nezago">here</a>!</span>`,
        });
        next();
      }
    });
};

export const getAllIdCardNumbers = (req, res, next) => {
  connect().query(GET_ALL_USERS_ID_CARD_NUMBERS, (err, result) => {
    if (err) {
      res.status(500).send({
        isUserIdSaved: false,
        info: '<span class="text-danger">Failed to retrieve id-card-numbers!</span>',
      });
    } else if (result) {
      res.status(500).send({
        isUserIdSaved: false,
        info: result.rows,
      });
      next();
    }
  });
};

export const getParticularIdCardNumberByIdCardNumber = (req, res, next) => {
  const { useridcardnumber } = req.body;
  if (useridcardnumber) {
    connect().query(GET_PARTICULAR_ID_CARD_NUMBER_BY_ID_CARD_NUMBER,
      [useridcardnumber], (err, result) => {
        if (err) {
          res.status(500).send({
            isUserIdSaved: false,
            info: '<span class="text-danger">Failed to retrieve id-card-number!</span>',
          });
        } else if (result) {
          res.status(200).send({
            isUserIdSaved: true,
            info: result.rows,
          });
          next();
        }
      });
  }
};

export const checkIfIdCardNumberExists = (req, res, next) => {
  const { useridcardnumber } = req.body;
  if (useridcardnumber) {
    connect().query(CHECK_IF_ID_CARD_NUMBER_EXISTS, [useridcardnumber], (err, result) => {
      if (err) {
        res.status(500).send({
          isUserIdchecked: false,
          info: '<span class="text-danger">Failed to check!</span>',
        });
      } else if (result) {
        res.status(200).send({
          isUserIdchecked: true,
          info: result.rows[0].exists,
        });
        next();
      }
    });
  }
};
