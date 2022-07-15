const express = require('express');

const {
  create,
  update,
  index,
  login,
  projectList,
  resetPassword,
  updateProfileImage
} = require('../controllers/User');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const {
  createUser,
  userLogin,
  resetPasswordValidation,
  updateUser,
} = require('../validations/User');

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(createUser), create);
router.route('/').patch(authenticate, validate(updateUser), update);
router.route('/login').post(validate(userLogin), login);
router.route('/projects').get(authenticate, projectList);
router
  .route('/reset-password')
  .post(validate(resetPasswordValidation), resetPassword);
router.route('/update-profile-image').post(authenticate, updateProfileImage);

module.exports = router;
