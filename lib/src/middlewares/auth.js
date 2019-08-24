import jwt from 'jsonwebtoken';
import auth from '../services/auth/authServices';
import config from '../config';

export default (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).send();
  } else {
    const authHeaderComponents = authHeader.split(' ');
    if (authHeaderComponents.length !== 2) {
      res.status(401).send();
    } else if (authHeaderComponents[0] !== 'Bearer') {
      res.status(401).send();
    } else {
      const jwtPayload = authHeaderComponents[1];
      jwt.verify(jwtPayload, config.jwtSecret, (error, decodedJwt) => {
        if (error) {
          res.status(401).send();
        } else if (decodedJwt.exp < Date.now()) {
          req.decodedJwt = decodedJwt;
          next();
        } else {
          res.status(401).send({ message: 'Token has expired' });
        }
      });
    }
  }
}