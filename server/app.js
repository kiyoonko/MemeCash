var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended = true;
}))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/user', function (req, res) {
	var postData = {
  		first_name: req.body.first_name,
  		last_name: req.body.last_name,
  		address: {
    		street_number: req.body.street_number,
    		street_name: req.body.street_name,
    		city: req.body.city,
    		state: req.body.state,
    		zip: req.body.zip
  		}
	} 
	res.send(postData);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});