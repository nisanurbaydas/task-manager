const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');

const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const errorHandler = require('./middlewares/errorHandler');

const { ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes } = require('./routes');

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
  app.use('/sections', SectionRoutes);
  app.use('/tasks', TaskRoutes);

  app.use((req, res, next) => {
    const error = new Error('Page you are looking for does not exist');
    error.status = 404;
    next(error);
  });

  //Error Handler
  app.use(errorHandler);
});
