const User = require('../model/User');

const insert = (data) => {
  return new User(data).save();
};

const list = () => {
  return User.find({});
};

const findOne = (where) => {
  console.log(where);
  return User.findOne(where);
};

const modify = (where, data) => {
  //If we didn't have joi validation just to update user:
  /*
  Object.keys(data).reduce((obj, key)=>{
    if(key !== 'password') obj[key] = data[key];
    return obj;
  }, {});
  */
  return User.findOneAndUpdate(where, data, { new: true });
};

module.exports = {
  insert,
  list,
  findOne,
  modify,
};
