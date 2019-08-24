import authServices from '../../services/auth/authServices';
import userServices from '../../services/users/usersServices';

export const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and password required.' });
  } else {
    try {
      const token = await authServices.login(req.body);
      res.json(token);
    } catch (error) {
      switch (error._message) {
        case 'User not found.':
          res.status(404).send({ message: 'User not found.' });
          break;
        case 'Passwords do not match.':
          res.status(401).send({ message: 'Password is incorrect.' });
          break;
        default:
          res.status(500).send({ message: 'Server error occured.' }); 
          break;  
      }
    }
  }
}

export const getLoggedInUserData = async (req, res) => {
  try {
    const userDoc = await userServices.getUser({ _id: req.decodedJwt._id });
    if (userDoc) {
      delete userDoc._doc.password;
      res.json(userDoc);
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error occured.' });
  }
}