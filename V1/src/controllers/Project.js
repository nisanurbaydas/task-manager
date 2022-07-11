const httpStatus = require('http-status');

const { insert, list, modify } = require('../services/Project');

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
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Something went wrong' })
    );
};

module.exports = {
  index,
  create,
  update,
};
