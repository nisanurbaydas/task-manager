const express = require('express');

const { create, index } = require('../controllers/Project');
const validate = require('../middlewares/validate');
const { createProject } = require('../validations/Project');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/').get(authenticate, index);
router.route('/').post(authenticate,validate(createProject), create);

module.exports = router;
