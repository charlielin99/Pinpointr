const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

var user = 1;
var volumes = [];
var position = '0 0';

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/position', function(req, res) {
  res.send(position);
});

app.get('/visualize', function(req, res) {
  res.sendFile(__dirname + '/public/visualize.html');
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
  console.log(volumes);
  if (volumes.length < 3) {
    volumes.push(req.body.volume);
  } else {

    triangulate(volumes);

    volumes = [];
  }
  res.sendStatus(200);
});

function triangulate(volumes) {
  var spawn = require("child_process").spawn;
  var child = spawn('python',["./triangulate.py", parseInt(volumes[0]), parseInt(volumes[1]), parseInt(volumes[2]) ] );
  child.stdout.on('data', function(data) {
      console.log(data.toString('utf-8'));
      position = data.toString('utf-8');
  });
  child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
  });
}

app.listen(PORT);
console.log(PORT);
