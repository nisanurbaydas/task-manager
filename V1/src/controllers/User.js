const path = require('path');
const httpStatus = require('http-status');
const uuid = require('uuid');

const Service = require('../services/User');
const UserService = new Service();

const projectService = require('../services/Project');
const ProjectService = new projectService();

const { passwordToHash, generateJWTAccessToken, generateJWTRefreshToken } = require('../scripts/utils/helper');
const eventEmitter = require('../scripts/events/eventEmitter');

const ApiError = require('../errors/ApiError');

const create = (req, res, next) => {
  req.body.password = passwordToHash(req.body.password);
  UserService.create(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const index = (req, res, next) => {
  UserService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const login = (req, res, next) => {
  req.body.password = passwordToHash(req.body.password);
  UserService.findOne(req.body)
    .then((user) => {
      if (!user) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
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
    .catch((e) => next(new ApiError(e?.message)));
};

const projectList = (req, res, next) => {
  ProjectService.list({ user_id: req.user?._id })
    .then((projects) => {
      res.status(httpStatus.OK).send(projects);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const resetPassword = (req, res, next) => {
  const new_password = uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`;
  UserService.update({ email: req.body.email }, { password: passwordToHash(new_password) })
    .then((updatedUser) => {
      if (!updatedUser) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      eventEmitter.emit('send_email', {
        //info - send mail with defined transport object
        to: updatedUser.email,
        subject: 'Reset Password',
        html: `User password has been changed. <br /> Your new pasword -> ${new_password}`,
      });
      res.status(httpStatus.OK).send({ message: 'Required information is sent your e-mail' });
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const update = (req, res, next) => {
  UserService.update({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      if (!updatedUser) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const updateProfileImage = (req, res, next) => {
  // Check file
  if (!req?.files?.profile_image) {
    return res.status(httpStatus.BAD_REQUEST).send({ error: 'Missing info' });
  }

  //Upload
  const extension = path.extname(req.files.profile_image.name);
  const fileName = `${req?.user._id}${extension}`;
  const folderPath = path.join(__dirname, '../', 'uploads/users', fileName);

  req.files.profile_image.mv(folderPath, function (err) {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
    UserService.update({ _id: req.user._id }, { profile_image: fileName })
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch((e) => next(new ApiError(e?.message)));
  });
};

const changePassword = (req, res, next) => {
  req.body.password = passwordToHash(req.body.password);
  UserService.update({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      if (!updatedUser) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch((e) => next(new ApiError(e?.message)));
};

const deleteUser = (req, res, next) => {
  UserService.delete(req.params?.id)
    .then((deletedItem) => {
      if (!deletedItem) return next(new ApiError('No such a record', httpStatus.NOT_FOUND));
      res.status(httpStatus.OK).send({
        message: 'Record deleted successfully',
      });
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e }));
};

module.exports = {
  index,
  create,
  login,
  projectList,
  resetPassword,
  update,
  updateProfileImage,
  changePassword,
  deleteUser,
};
