
const express = require('express');
const app = express();
var cors = require('cors');
var http = require('http')
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 4000;

app.use(cors());
app.use(bodyParser.json());

const auth = require('./Authentification/auth');
app.use('/auth',auth);








mongoose.connect('mongodb://localhost:27017/expert', {
  useNewUrlParser: true ,
  useCreateIndex: true ,
}, (err) => {
  if (!err) {
    console.log('connected to database successfully')
  } else {
    console.log('error while connection')
  }
});
app.listen(port, function (err, response) {
  console.log('started at port number : ', port);
});
http.createServer(function(request, response) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  console.log("aaaaa");
}).listen(8000);
