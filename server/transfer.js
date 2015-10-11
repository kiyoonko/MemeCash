var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended = true;
// }))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/user', function (req, res) {
  var payer_ID = req.body.payer_ID;
  var postData = {
    medium: req.body.medium,
    payee_id: req.body.payee_ID,
    amount: req.body.amount
  }
  console.log("payer ID", payer_ID);
  var url = "http://api.reimaginebanking.com/accounts/"+payer_ID+"/transfers?key=e833c6c363ae8cbcad538f4fb79e6492";
  var options = {
    method: 'post',
    body: postData,
    json: true,
    uri: url
  };


  rp(options). then(function(createTransaction){
    console.log("Create Transaction", createTransaction);
    var options = {
      method: 'get',
      uri: url
    }
    res.status(200).send({
        payerID: req.body.payer_ID,
        payeeID: req.body.payee_ID,
        money: req.body.amount
      });
  }).catch(function(err){
    console.log("error", err);
  });
});

var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
