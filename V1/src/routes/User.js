const express = require('express');

const { create, index } = require('../controllers/User');
const validate = require('../middlewares/validate');
const { createUser } = require('../validations/User');

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(createUser), create);

module.exports = router;
