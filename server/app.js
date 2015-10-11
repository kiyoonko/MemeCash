var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/user', function (req, res) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
	var postData = {
    first_name: first_name,
    last_name: last_name,
    address: {
      street_number: req.body.address.street_number,
      street_name: req.body.address.street_name,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip
    }
  };
  
  var url = "http://api.reimaginebanking.com/customers?key=e833c6c363ae8cbcad538f4fb79e6492";
  var options = {
    method: 'post',
    body: postData,
    json: true,
    uri: url
  };

  rp(options).then(function (createUser){
      console.log("Create User", createUser);
      var options = {
        method: 'get',
        uri: url
      }
      return rp(options);    
    }).then(function (getAllUsers){
     getAllUsers = JSON.parse(getAllUsers);
      var customer = getAllUsers.filter(function(user) {
        return user.first_name == first_name && user.last_name == last_name;
      });
      return customer[0]._id;
    }).then(function (id){
      customerId = id;
      var url = "http://api.reimaginebanking.com/customers/"+customerId+"/accounts?key=e833c6c363ae8cbcad538f4fb79e6492";
      var postData = {
        type: "Savings",
        nickname: "Primary",
        rewards: 0,
        balance: 100,
      }
      var options = {
        method: 'post',
        body: postData,
        json: true,
        uri: url
      };
      return rp(options);
    }).then(function(createAccount){
      console.log("Create Account", createAccount);
      var accountsUrl = "http://api.reimaginebanking.com/customers/"+customerId+"/accounts?key=e833c6c363ae8cbcad538f4fb79e6492";
      console.log(accountsUrl);
      var options = {
        method: 'get',
        uri: accountsUrl
      }
      return rp(options);

    }).then(function(getAllAccounts){
      getAllAccounts = JSON.parse(getAllAccounts);
      console.log(getAllAccounts);

      accountId = getAllAccounts[0]._id;
      console.log("Created Account", accountId);
      res.send({
        customerId: customerId,
        accountId: accountId
      })
    }).catch(function(error){
      console.log("error", error.message);
      res.status(404).error("An error occurred");
    });
 });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});