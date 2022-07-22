const e = require('express');
const httpStatus = require('http-status');

const Service = require('../services/Task');
const TaskService = new Service();
const ApiError = require('../errors/ApiError');

const index = (req, res, next) => {
  TaskService.list({ project_id: req.params.projectId })
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const create = (req, res, next) => {
  req.body.user_id = req.user;
  TaskService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const update = (req, res, next) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing information' });
  }
  TaskService.update(req.params?.id, req.body)
    .then((updatedTask) => {
      res.status(httpStatus.OK).send(updatedTask);
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong' }));
};

const deleteTask = (req, res, next) => {
  TaskService.delete(req.params?.id)
    .then((deletedItem) => {
      if (!deletedItem) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(deletedItem);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const addComment = (req, res, next) => {
  TaskService.findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      const comment = {
        ...req.body,
        commented_at: new Date(),
        user_id: req.user,
      };
      mainTask.comments.push(comment);
      mainTask
        .save()
        .then((updatedTask) => {
          return res.status(httpStatus.OK).send(updatedTask);
        })
        .catch((e) => next(new ApiError(e?.message)));
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const deleteComment = (req, res, next) => {
  TaskService.findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
      mainTask
        .save()
        .then((updatedTask) => {
          return res.status(httpStatus.OK).send(updatedTask);
        })
        .catch((e) => next(new ApiError(e?.message)));
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const addSubTask = (req, res, next) => {
  //MainTask çekilir
  TaskService.findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      //SubTask create edilir (Task)
      TaskService.create({ ...req.body, user_id: req.user })
        .then((subTask) => {
          //SubTask'in referansı MainTask üzerinde gösterilir ve update edilir
          mainTask.sub_tasks.push(subTask);
          mainTask
            .save()
            .then((updatedDoc) => {
              //Kullanıcıya yeni döküman gönderilir
              return res.status(httpStatus.OK).send(updatedDoc);
            })
            .catch((e) => next(new ApiError(e?.message)));
        })
        .catch((e) => next(new ApiError(e?.message)));
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const fetchTask = (req, res, next) => {
  TaskService.findOne({ _id: req.params.id }, true)
    .then((task) => {
      if (!task) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(task);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

module.exports = {
  index,
  create,
  update,
  deleteTask,
  addComment,
  deleteComment,
  addSubTask,
  fetchTask,
};
