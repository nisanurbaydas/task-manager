const httpStatus = require('http-status');

const Service = require('../services/Section');
const SectionService = new Service();
const ApiError = require('../errors/ApiError');

const index = (req, res, next) => {
  SectionService.list({ project_id: req.params.projectId })
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const create = (req, res, next) => {
  req.body.user_id = req.user;
  SectionService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const update = (req, res, next) => {
  SectionService.update(req.params?.id, req.body)
    .then((updatedSection) => {
      if (!updatedSection) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(updatedSection);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const deleteSection = (req, res, next) => {
  SectionService.delete(req.params?.id)
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
  deleteSection,
};
