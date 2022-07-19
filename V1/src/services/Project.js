const BaseService = require('./BaseService');
const BaseModel = require('../model/Project');

class Project extends BaseService {
  constructor() {
    super(BaseModel);
  }
  list(where) {
    return BaseModel.find(where || {}).populate({
      path: 'user_id',
      select: 'full_name email',
    });
  }
}

module.exports = Project;
