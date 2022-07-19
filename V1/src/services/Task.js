const BaseService = require('./BaseService');
const BaseModel = require('../model/Task');

class Task extends BaseService {
  constructor() {
    super(BaseModel);
  }
  findOne(where, expand) {
    if (!expand) return BaseModel.findOne(where);
    return BaseModel.findOne(where)
      .populate({
        path: 'user_id',
        select: 'full_name email profile_image',
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user_id',
          select: 'full_name email profile_image',
        },
      })
      .populate({
        path: 'sub_tasks',
        select: 'title description isCompleted assigned_to due_date order sub_tasks statuses',
      });
  }

  list(where) {
    return BaseModel.find(where || {}).populate({
      path: 'user_id',
      select: 'full_name email',
    });
  }
}

module.exports = Task;
