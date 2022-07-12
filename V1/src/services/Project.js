const Project = require('../model/Project');

const list = (where) => {
  return Project.find(where || {}).populate({
    path: 'user_id',
    select: 'full_name email',
  });
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
