import User from '../models/user';

export const getUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username })
      .then((u) => {
        if (u !== null) {
          resolve(u);
        } else {
          reject(new Error(`User with username: ${username} not found`));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({})
      .then((u) => {
        if (u !== null) {
          resolve(u);
        } else {
          reject(new Error('there was an error retrieving all users'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
