const Joi = require('joi');

const createSection = Joi.object({
  name: Joi.string().required().min(3),
  project_id: Joi.string().required().min(8),
});

const updateSection = Joi.object({
  name: Joi.string().required().min(3),
  //project: Joi.string().required().min(8),
  //bi projeye ait section'ı başka bir projeye göndermek için
});

module.exports = {
  createSection,
  updateSection,
};
