const httpStatus = require('http-status');

const { insert, list, findOne } = require('../services/User');
const { passwordToHash } = require('../scripts/utils/helper');

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message);
    });
};

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  findOne(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: 'User not found' });
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

module.exports = {
  index,
  create,
  login,
};
