const httpStatus = require('http-status');

const Service = require('../services/Project');
const ProjectService = new Service();
const ApiError = require('../errors/ApiError');

const index = (req, res, next) => {
  ProjectService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const create = (req, res, next) => {
  req.body.user_id = req.user;
  ProjectService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const update = (req, res, next) => {
  ProjectService.update(req.params?.id, req.body)
    .then((updatedProject) => {
      if (!updatedProject) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(updatedProject);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const deleteProject = (req, res, next) => {
  ProjectService.delete(req.params?.id)
    .then((deletedItem) => {
      if (!deletedItem) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(deletedItem);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

module.exports = {
  index,
  create,
  update,
  deleteProject,
};
