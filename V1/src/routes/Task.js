const express = require('express');

const { create, update, deleteTask, addComment, deleteComment, addSubTask, fetchTask } = require('../controllers/Task');
const validate = require('../middlewares/validate');
const { createTask, updateTask, commentValidation } = require('../validations/Task');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/').post(authenticate, validate(createTask), create);
router.route('/:id').patch(authenticate, validate(updateTask), update);
router.route('/:id').delete(authenticate, deleteTask);

router.route('/:id/add-comment').post(authenticate, validate(commentValidation), addComment);
router.route('/:id/:commentId').delete(authenticate, deleteComment);

router.route('/:id/add-sub-task').post(authenticate, validate(createTask), addSubTask);
router.route('/:id').get(authenticate, fetchTask);

module.exports = router;
