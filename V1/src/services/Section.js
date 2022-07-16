const Section = require('../model/Section');

const list = (where) => {
  //console.log(where);
  return Section.find(where || {}).populate({
    path: 'user_id',
    select: 'full_name email',
  });
};

const insert = (data) => {
  return new Section(data).save();
};

const modify = (data, id) => {
  return Section.findByIdAndUpdate(id, data, { new: true });
};

const remove = (id) => {
  return Section.findByIdAndDelete(id);
};

module.exports = {
  insert,
  list,
  modify,
  remove,
};
