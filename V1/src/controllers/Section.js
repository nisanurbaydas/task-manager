const httpStatus = require('http-status');

const { insert, list, modify, remove } = require('../services/Section');

const index = (req, res) => {
  if (!req?.params?.projectId)
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ error: 'Missing information' });
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
    // res.status(httpStatus.CREATED).send("Section Create");
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

const update = (req, res) => {
  if (!req.params.id) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Missing information' });
  }
  modify(req.body, req.params?.id)
    .then((updatedSection) => {
      res.status(httpStatus.OK).send(updatedSection);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Something went wrong' })
    );
};

const deleteSection = (req, res) => {
  if (!req.params.id) {
    return res.status(httpStatus.BAD_REQUEST).send('Missing information');
  }
  remove(req.params?.id)
    .then((deletedItem) => {
      res.status(httpStatus.OK).send(deletedItem);
    })
    .catch(() => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Something went wrong' });
    });
};

module.exports = {
  index,
  create,
  update,
  deleteSection,
};
