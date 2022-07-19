const Project = require('../model/Project');

const list = (where) => {
  //console.log(where);
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

const remove = (id) => {
  return Project.findByIdAndDelete(id);
};

module.exports = {
  insert,
  list,
  modify,
  remove,
};
