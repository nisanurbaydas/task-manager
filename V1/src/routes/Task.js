const express = require('express');

const { create, update, deleteTask, addComment, deleteComment, addSubTask, fetchTask } = require('../controllers/Task');
const validate = require('../middlewares/validate');
const { createTask, updateTask, commentValidation } = require('../validations/Task');
const authenticate = require('../middlewares/authenticate');
const idChecker = require('../middlewares/idChecker');

const router = express.Router();

router.route('/').post(authenticate, validate(createTask), create);
router.route('/:id').patch(idChecker(), authenticate, validate(updateTask), update);
router.route('/:id').delete(idChecker(), authenticate, deleteTask);

router.route('/:id/add-comment').post(idChecker(), authenticate, validate(commentValidation), addComment);
router.route('/:id/:commentId').delete(idChecker(), authenticate, deleteComment);

router.route('/:id/add-sub-task').post(idChecker(), authenticate, validate(createTask), addSubTask);
router.route('/:id').get(idChecker(), authenticate, fetchTask);

module.exports = router;
