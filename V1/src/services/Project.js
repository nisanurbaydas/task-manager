const Project = require('../model/Project');

const insert = (data) => {
  const project = new Project(data);
  return project.save();
};

const list = () => {
  return Project.find({});
};

module.exports = {
  insert,
  list,
};
