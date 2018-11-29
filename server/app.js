require('../config/env');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const sessions = require('client-sessions');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const apiRouter = require('./api');

const app = express();
const clientSession = sessions({
  cookieName: 'u_c_s',
  secret: process.env.CS_SECRET,
  // httpOnly: true,
  secure: false,
  ephemeral: true,
  maxAge: 6 * 60 * 60 * 1000 // 6 hours
});

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
app.use(clientSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use('/api', apiRouter);

module.exports = app;
