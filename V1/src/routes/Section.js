const express = require('express');

const {
  create,
  index,
  update,
  deleteSection,
} = require('../controllers/Section');
const validate = require('../middlewares/validate');
const { createSection, updateSection } = require('../validations/Section');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/:projectId').get(authenticate, index);
router.route('/').post(authenticate, validate(createSection), create);
router.route('/:id').patch(authenticate, validate(updateSection), update);
router.route('/:id').delete(authenticate, deleteSection);

module.exports = router;
