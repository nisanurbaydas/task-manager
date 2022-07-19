const BaseService = require('./BaseService');
const BaseModel = require('../model/Section');

class Section extends BaseService {
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

module.exports = Section;
