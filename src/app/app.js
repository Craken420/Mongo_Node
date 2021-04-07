'use strict'
require('./bd/bd');

const morgan = require('morgan'),
      cors = require('cors'),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));

// Routes
app.use('/api/todo', require('./routes/task-routes'));

module.exports = app;
