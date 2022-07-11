const Project = require('../model/Project');

const list = () => {
  return Project.find({});
};

const insert = (data) => {
  return new Project(data).save();
};

const modify = (data, id) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  insert,
  list,
  modify,
};
