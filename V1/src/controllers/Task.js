const e = require('express');
const httpStatus = require('http-status');

const { insert, list, modify, remove, findOne } = require('../services/Task');

const index = (req, res) => {
  if (!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Missing information' });
  list({ project_id: req.params.projectId })
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

const create = (req, res) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

const update = (req, res) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing information' });
  }
  modify(req.body, req.params?.id)
    .then((updatedTask) => {
      res.status(httpStatus.OK).send(updatedTask);
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong' }));
};

const deleteTask = (req, res) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send('Missing information');
  }
  remove(req.params?.id)
    .then((deletedItem) => {
      res.status(httpStatus.OK).send(deletedItem);
    })
    .catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong' });
    });
};

const addComment = (req, res) => {
  findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'No such a reccord ' });
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
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }));
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }));
};

const deleteComment = (req, res) => {
  findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'No such a reccord ' });
      mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
      mainTask
        .save()
        .then((updatedTask) => {
          return res.status(httpStatus.OK).send(updatedTask);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }));
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }));
};

const addSubTask = (req, res) => {
  //MainTask çekilir
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing information' });
  findOne({ _id: req.params.id })
    .then((mainTask) => {
      if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'No such a reccord ' });
      //SubTask create edilir (Task)
      insert({ ...req.body, user_id: req.user })
        .then((subTask) => {
          //SubTask'in referansı MainTask üzerinde gösterilir ve update edilir
          mainTask.sub_tasks.push(subTask);
          mainTask
            .save()
            .then((updatedDoc) => {
              //Kullanıcıya yeni döküman gönderilir
              return res.status(httpStatus.OK).send(updatedDoc);
            })
            .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }));
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const fetchTask = (req, res) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing information' });

  findOne({ _id: req.params.id }, true)
    .then((task) => {
      if (!task) return res.status(httpStatus.NOT_FOUND).send({ message: 'No such record' });
      res.status(httpStatus.OK).send(task);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
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
