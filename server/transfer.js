var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended = true;
// }))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/user', function (req, res) {
  
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});