const User = require('../model/User');

const insert = (data) => {
  return new User(data).save();
};

const list = () => {
  return User.find({});
};

const findOne = (where) => {
  return User.findOne(where);
};

module.exports = {
  insert,
  list,
  findOne,
};
