const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');

const { ProjectRoutes, UserRoutes } = require('./routes');

config();
loaders();
events();

const app = express();
app.use(express.json());
app.use(helmet());

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  app.use('/projects', ProjectRoutes);
  app.use('/users', UserRoutes);
});
