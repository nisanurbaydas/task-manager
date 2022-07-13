const httpStatus = require('http-status');

const { insert, list, modify, remove } = require('../services/Project');

const index = (req, res) => {
  list()
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
    // res.status(httpStatus.CREATED).send("Project Create");
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
    .then((updatedProject) => {
      res.status(httpStatus.OK).send(updatedProject);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Something went wrong' })
    );
};

const deleteProject = (req, res) => {
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
  deleteProject
};
