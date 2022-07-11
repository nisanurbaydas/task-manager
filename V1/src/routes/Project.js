const express = require('express');

const { create, index, update } = require('../controllers/Project');
const validate = require('../middlewares/validate');
const { createProject, updateProject } = require('../validations/Project');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/').get(authenticate, index);
router.route('/').post(authenticate, validate(createProject), create);
router.route('/:id').patch(authenticate, validate(updateProject), update);

module.exports = router;
