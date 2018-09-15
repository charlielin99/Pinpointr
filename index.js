const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

var user = 1;
var volumes = [];

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/beacons',function(req,res){
  res.sendFile(__dirname+'/public/beacons.html');
});

app.get('/getusername', function(req, res) {
  res.send('' + user);
  user++;
});

app.get('/timetest',function(req,res){
  res.sendFile(__dirname+'/public/timetest.html');
});

app.post('/time', function(req, res) {
  console.log(req.body.sent - Date.now());
});

app.post('/update', function(req,res) {
  if (volumes.length < 3) {
    volumes.push(req.body.volume);
  } else {
    
    volumes = [];
  }
});



app.listen(PORT);
console.log(PORT);
