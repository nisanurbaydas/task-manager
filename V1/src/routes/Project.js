const express = require('express');

const { create, index } = require('../controllers/Project');

const router = express.Router();

router.get('/', index);

module.exports = {
  router,
};
