const User = require('../model/User');

const insert = (data) => {
  return new User(data).save();
};

const list = () => {
  return User.find({});
};

module.exports = {
  insert,
  list,
};
