import userServices from '../../services/users/usersServices';
import isValidObjectId from '../../utils/isValidObjectId';

export const createUser = async (req, res) => {
  try {
    const userDto = await userServices.createUser(req.body);
    res.json(userDto);
  } catch (error) {
    if (error._message && error._message === 'User validation failed') {
      res.status(400).send(error);
    } else if (error.code && error.code === 11000) {
      res.status(409).send(error);
    } else {
      res.status(500).send(error);
    }
  }
}

export const getUsers = async (req, res) => {
  const users = await userServices.getUsers();
  res.json(users);
}

export const getUser = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    try {
      const user = await userServices.getUser(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error occured.' });
    }
  } else {
    res.status(400).send({ message: 'id is incorrect.' });
  }
}

export const updateUser = async (req, res) => {
  // const { body: { id }, body: { user } } = req;
  // const userDto = await UserModel.findByIdAndUpdate({ _id: id }, user);
}