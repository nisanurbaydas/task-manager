const express = require('express');

const { create, index, update, deleteSection } = require('../controllers/Section');
const validate = require('../middlewares/validate');
const { createSection, updateSection } = require('../validations/Section');
const authenticate = require('../middlewares/authenticate');
const idChecker = require('../middlewares/idChecker');

const router = express.Router();

router.route('/:projectId').get(idChecker('projectId'), authenticate, index);
router.route('/').post(authenticate, validate(createSection), create);
router.route('/:id').patch(idChecker(), authenticate, validate(updateSection), update);
router.route('/:id').delete(idChecker(), authenticate, deleteSection);

module.exports = router;
