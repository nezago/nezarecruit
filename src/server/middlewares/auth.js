/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  let token;
  if (req.query.redirect) {
    token = req.query.oauth;
  } else {
    token = req.headers.authorization.split(' ')[1];
  }

  try {
    const decodedToken = jwt.verify(token, 'mugirase');
    req.authenticatedUser = decodedToken;
    next();
  } catch (err) {
    res.status(401).send('You are not allowed to access this page');
  }
};
export const authenticateRedirect = () => { };
