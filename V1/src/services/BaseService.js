let BaseModel = null;

class BaseService {
  constructor(model) {
    BaseModel = model;
  }
  list(where) {
    return BaseModel?.find(where || {});
  }

  create(data) {
    return new BaseModel(data).save();
  }

  findOne(where) {
    return BaseModel.findOne(where);
  }

  update(data, id) {
    return BaseModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return BaseModel.findByIdAndDelete(id);
  }
}

module.exports = BaseService;
