const Joi = require('joi');

const createProject = Joi.object({
  name: Joi.string().required().min(2),
  //_id: Joi.string().min(8),
});

const updateProject = Joi.object({
  name: Joi.string().required().min(2),
});

module.exports = {
  createProject,
  updateProject,
};
