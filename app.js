// for handling routes
const express = require('express');
const path = require('path');

// for requests log
const logger = require('morgan');

// for subroutes use
const api_router = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* map api routes. */
app.use('/api', api_router);

module.exports = app;
