const express = require('express');

const { create, index, update, deleteProject } = require('../controllers/Project');
const validate = require('../middlewares/validate');
const { createProject, updateProject } = require('../validations/Project');
const authenticate = require('../middlewares/authenticate');
const idChecker = require('../middlewares/idChecker');

const router = express.Router();

router.route('/').get(authenticate, index);
router.route('/').post(authenticate, validate(createProject), create);
router.route('/:id').patch(idChecker(), authenticate, validate(updateProject), update);
router.route('/:id').delete(idChecker(), authenticate, deleteProject);

module.exports = router;
