const express = require('express');
const app = express();
var cors = require('cors');

var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 4000;

app.use(cors());
app.use(bodyParser.json());

const auth = require('./Authentification/auth');
app.use('/auth',auth);
const profile = require('./profiles/consultant');
app.use('/profileConsultant', profile);

const filter = require('./filter/filterconsutlant');
app.use('/filter',filter);







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

