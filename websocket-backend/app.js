/*jslint node: true */
/*jslint white: true */
'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error: ' + err);
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

var players = {};
var playerId = 0;
io.on('connection', function(socket){
  //Assign an id
  playerId += 1;
  socket.userId = playerId;
  console.log('new player id: ' + socket.userId);
  players[socket.userId] = socket;
  //Give the player their id
  socket.emit('connection_successful', socket.userId);
  //Spawn the new player
  io.emit('new_player', socket.userId);
  //Remove player from hashmap on disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected ' + new Date());
    players[socket.userId] = null;
  });
});

module.exports = app;
