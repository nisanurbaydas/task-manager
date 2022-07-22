const httpStatus = require('http-status');

const Service = require('../services/Project');
const ProjectService = new Service();
const ApiError = require('../errors/ApiError');

const index = (req, res) => {
  ProjectService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

const create = (req, res) => {
  req.body.user_id = req.user;
  ProjectService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

const update = (req, res, next) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Missing information' });
  }
  ProjectService.update(req.params?.id, req.body)
    .then((updatedProject) => {
      if (!updatedProject) return next(new ApiError('No such a record', '404'));
      res.status(httpStatus.OK).send(updatedProject);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const deleteProject = (req, res) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send('Missing information');
  }
  ProjectService.delete(req.params?.id)
    .then((deletedItem) => {
      if (!deletedItem) return res.status(httpStatus.NOT_FOUND).send('No such item');
      res.status(httpStatus.OK).send(deletedItem);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e });
    });
};

module.exports = {
  index,
  create,
  update,
  deleteProject,
};
