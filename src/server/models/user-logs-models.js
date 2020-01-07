import connect from './db/settings/connectToDb';
import {
  ADD_NEW_USER_LOG,
  GET_ALL_LOGS,
  GET_PARTICULAR_LOG_BY_USER_ID,
  GET_PARTICULAR_LOG_BY_LOG_ID,
  GET_PARTICULAR_LOG_BY_LOG_DATES,
  GET_PARTICULAR_LOG_BY_LOG_DATES_AND_USER_ID,
} from './db/settings/SQLqueries';

export const addNewUserLog = (req, res, next) => {
  const {
    userid, useraction,
  } = req.body;
  connect().query(ADD_NEW_USER_LOG, [userid, useraction], (err, result) => {
    if (err) {
      res.status(500).send({
        isLogSaved: false,
        info: `<span class="text-danger">Sorry!
                 The log failed to save it</span>`,
      });
    } else if (result) {
      next();
    }
  });
};

export const getAllUsersLogs = (req, res, next) => {
  connect().query(GET_ALL_LOGS, (err, result) => {
    if (err) {
      res.status(500).send({
        isUserLogsRetrieved: false,
        info: `<span class="text-danger">Sorry! Something wrong occured, so we couldn't retrieve
                all users logs as you were expecting it to be. So please refresh the browser!</span>`,
      });
    } else if (result) {
      res.status(200).send({
        isUserLogsRetrieved: true,
        info: result.rows,
      });
      next();
    }
  });
};

export const getUserLogByUserId = (req, res, next) => {
  const { userid } = req.body;
  if (userid) {
    connect().query(GET_PARTICULAR_LOG_BY_USER_ID, [parseInt(userid)], (err, result) => {
      if (err) {
        res.status(500).send({
          isUserLogRetrieved: false,
          info: '<span class="text-danger">Sorry! Something wrong occured, so refresh the page again</span>',
        });
      } else if (result) {
        res.status(200).send({
          isUserLogRetrieved: true,
          info: result.rows,
        });
        next();
      }
    });
  } else {
    res.status(400).send({
      isUserLogValid: false,
      info: '<span class="text-danger">Failed to get your user-id, refresh the page</span>',
    });
  }
};

export const getUserLogByLogId = (req, res, next) => {
  const { logId } = req.body;
  if (logId) {
    connect().query(GET_PARTICULAR_LOG_BY_LOG_ID, [parseInt(logId)], (err, result) => {
      if (err) {
        res.status(500).send({
          isUserLogRetrieved: false,
          info: '<span class="text-danger">Sorry! Failed to retrieve</span>',
        });
      } else if (result) {
        res.state(200).send({
          isUserLogRetrieved: true,
          info: result.rows,
        });
        next();
      }
    });
  } else {
    res.status(400).send({
      isLogRequestValid: false,
      info: '<span class="text-danger">A user-log-id is not valid</span>',
    });
  }
};

export const getUserLogByDates = (req, res, next) => {
  const { startdate, enddate } = req.body;
  if (startdate && enddate) {
    connect().query(GET_PARTICULAR_LOG_BY_LOG_DATES, [startdate, enddate], (err, result) => {
      if (err) {
        res.status(500).send({
          isUserLogRetrieved: false,
          info: '<span class="text-danger">Sorry! Failed to retrieve</span>',
        });
      } else if (result) {
        res.status(200).send({
          isUserLogRetrieved: true,
          info: result.rows,
        });
        next();
      }
    });
  } else {
    res.status(400).send({
      isUserLogRetrieved: false,
      info: '<span class="text-danger">Enter start date or end date</span>',
    });
  }
};

export const getUserLogByDatesAndUserId = (req, res, next) => {
  const { userid, startdate, enddate } = req.body;
  if (userid && startdate && enddate) {
    connect().query(GET_PARTICULAR_LOG_BY_LOG_DATES_AND_USER_ID,
      [parseInt(userid), startdate, enddate], (err, result) => {
        if (err) {
          res.status(500).send({
            isUserLogRetrieved: false,
            info: '<span class="text-danger">Sorry! Failed to retrieve</span>',
          });
        } else if (result) {
          res.status(200).send({
            isUserLogRetrieved: true,
            info: result.rows,
          });
          next();
        }
      });
  } else {
    res.status(400).send({
      isUserLogRetrieved: false,
      info: '<span class="text-danger">Enter start date or end date</span>',
    });
  }
};
