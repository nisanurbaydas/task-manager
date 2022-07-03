const httpStatus = require('http-status')

const { insert, list } = require("../services/Project");

const create = (req, res) => {
  insert({name: "Test Project"})
  res.status(httpStatus.CREATED).send("Project Create");
  // .then((response)=>{
  //   res.status(httpStatus.CREATED).send(response);
  // }).catch((e)=>{
  //   res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e.message)
  // })
};

const index = (req, res) => {
  list()
  .then((response)=>{
    res.status(httpStatus.OK).send(response);
  }).catch((e)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
  })
};

module.exports = {
  index,
  create,
};
