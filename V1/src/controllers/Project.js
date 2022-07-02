const index = (req, res) => {
  res.status(200).send('Project Index');
};

const create = (req, res) => {
  res.status(200).send('Project Create');
};

module.exports = {
  index,
  create,
};
