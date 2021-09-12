// for handling routes
const express = require('express');
const path = require('path');
// for cors handling
const cors = require('cors')
// for socket handling
const expressWs = require('express-ws')
// for requests log
const logger = require('morgan');

const app = express();
// link sockets with express
const wsapp = expressWs(app)

// export express socket to be used by sub routes
module.exports.wsapp = wsapp

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// for subroutes use
const api_router = require('./routes/index');
/* map api routes. */
app.use('/api', api_router);

module.exports = app
