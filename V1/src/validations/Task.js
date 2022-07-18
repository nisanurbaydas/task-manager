const Joi = require('joi');

const createTask = Joi.object({
  title: Joi.string().required().min(3),
  section_id: Joi.string().required().min(8),
  project_id: Joi.string().required().min(8),
  description: Joi.string().min(8),
  assigned_to: Joi.string().min(8),
  due_date: Joi.date(),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
  sub_tasks: Joi.array(),
});

const updateTask = Joi.object({
  title: Joi.string().min(3),
  section_id: Joi.string().min(8),
  project_id: Joi.string().min(8),
  description: Joi.string().min(8),
  assigned_to: Joi.string().min(8),
  due_date: Joi.date(),
  statuses: Joi.array(),
  order: Joi.number(),
  isCompleted: Joi.boolean(),
  comments: Joi.array(),
  media: Joi.array(),
  sub_tasks: Joi.array(),
});

const commentValidation = Joi.object({
  comment: Joi.string().min(3),
  _id: Joi.string().min(8),
});

module.exports = {
  createTask,
  updateTask,
  commentValidation,
};
