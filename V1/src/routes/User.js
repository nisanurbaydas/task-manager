const express = require('express');

const { create, index, login, projectList, resetPassword } = require('../controllers/User');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const { createUser, userLogin, resetPasswordValidation } = require('../validations/User');

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(createUser), create);
router.route('/login').post(validate(userLogin), login);
router.route('/projects').get(authenticate, projectList);
router.route('/reset-password').post(validate(resetPasswordValidation), resetPassword)

module.exports = router;
