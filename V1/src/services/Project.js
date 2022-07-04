const Project = require('../model/Project');

const insert = (data) => {
  return new Project(data).save();
};

const list = () => {
  return Project.find({});
};

module.exports = {
  insert,
  list,
};
