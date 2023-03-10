const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout')

const indexRouter = require('./routes/index');
const loggingRouter = require('./routes/logging');
const sqlRouter = require('./routes/sql');
const firestoreRouter = require('./routes/firestore');
const redisRouter = require('./routes/redis');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(timeout('8s'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/logging', loggingRouter);
app.use('/sql', sqlRouter);
app.use('/firestore', firestoreRouter);
app.use('/redis', redisRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
