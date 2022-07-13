const httpStatus = require('http-status');
const uuid = require('uuid');

const { insert, list, findOne, modify } = require('../services/User');
const projectService = require('../services/Project');
const {
  passwordToHash,
  generateJWTAccessToken,
  generateJWTRefreshToken,
} = require('../scripts/utils/helper');
const eventEmitter = require('../scripts/events/eventEmitter');

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
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateJWTAccessToken(user),
          refresh_token: generateJWTRefreshToken(user),
        },
      };
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const projectList = (req, res) => {
  //console.log(req.user);
  projectService
    .list({ user_id: req.user?._id })
    .then((projects) => {
      res.status(httpStatus.OK).send(projects);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Soething went wronng' })
    );
};

const resetPassword = (req, res) => {
  const new_password =
    uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`;
  modify({ email: req.body.email }, { password: passwordToHash(new_password) })
    .then((updatedUser) => {
      if (!updatedUser)
        return res.status(httpStatus.NOT_FOUND).send({ error: 'No such user' });
      eventEmitter.emit('send_email', {
        //info - send mail with defined transport object
        to: updatedUser.email,
        subject: 'Reset Password',
        html: `User password has been changed. <br /> Your new pasword -> ${new_password}`,
      });
      res
        .status(httpStatus.OK)
        .send({ message: 'Required information is sent your e-mail' });
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Something went wrong' })
    );
};

module.exports = {
  index,
  create,
  login,
  projectList,
  resetPassword,
};
