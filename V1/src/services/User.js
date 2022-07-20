const BaseService = require('./BaseService');
const BaseModel = require('../model/User');

class User extends BaseService {
  constructor() {
    super(BaseModel);
  }
  update(where, data) {
    return BaseModel.findOneAndUpdate(where, data, { new: true });
  }
}

module.exports = User;
