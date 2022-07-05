const express = require('express');

const { create, index } = require('../controllers/Project');
const validate = require('../middlewares/validate');
const { createProject } = require('../validations/Project');

const router = express.Router();

router.get('/', index);
router.route('/').post(validate(createProject), create);

module.exports = router;
