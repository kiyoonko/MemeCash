var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended = true;
// }))

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
  } 
  
  var url = "http://api.reimaginebanking.com/customers?key=e833c6c363ae8cbcad538f4fb79e6492";
  var options = {
    method: 'post',
    body: postData,
    json: true,
    uri: url
    resolveWithFullResponse: true
  };
  rp(options).then(function (response){
      console.log(response);
    });
//       var options = {
//         method: 'get',
//         url: url
//       }
//       request(options, function (err, res, body){
//         if(err){
//           console.log(err);
//         }
//         else{
//           var parsedBody = JSON.parse(body);
//           // console.log("body", parsedBody);

//           parsedBody.forEach(function(customer){
//             //console.log(customer);
//             //console.log(customer.first_name+" vs. "+first_name);
//             //console.log(customer.last_name+" vs. "+last_name);
//             // console.log("This is real");
//             if(customer.first_name == first_name && customer.last_name == last_name){
//               // console.log(customer);
//               console.log(customer.first_name+" "+customer.last_name);
//               console.log(customer._id);
//             }
//           })

//           // for (var i = body.length - 1; i >= 0; i--) {
//           //   var customer = body[i];
//           //   //console.log(customer);
//           //   if(customer.first_name == first_name && customer.last_name == last_name){
//           //     console.log(customer._id);
//           //     break;
//           //   }
//           // };
//         }
//       })

//     }
//   })
   res.send(postData);
 });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});