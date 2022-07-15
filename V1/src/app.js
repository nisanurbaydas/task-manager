const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');

const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');

const { ProjectRoutes, UserRoutes } = require('./routes');

config();
loaders();
events();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, './', 'uploads')));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  app.use('/projects', ProjectRoutes);
  app.use('/users', UserRoutes);
});
