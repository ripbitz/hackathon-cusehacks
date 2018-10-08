/* Mario Taglic
  Justin Russo
  Trevor Petrus */

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const translate = require('google-translate-api');

app.use(express.static('media'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg,lang){
    io.emit('chat message', msg,lang);
  });

  socket.on('chat recieve', function(msg, lang){
  translate(msg, {
    to: lang
  }).then(res => {
      io.emit('chat recieve', res.text,lang);
  }).catch(err => {
    console.error(err);
  });
  });

})
