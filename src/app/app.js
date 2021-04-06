require('./bd/bd');

const morgan = require('morgan'),
      cors = require('cors'),
      express = require('express'),
      app = express();

app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false}))

module.exports = app;
