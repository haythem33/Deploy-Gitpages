const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.port || 4000;
var http = require('http').Server(app);
var io = require('socket.io')(http, {origins: '*:*'});

app.io = io;

app.use(bodyParser.json());

const auth = require('./Authentification/auth');
app.use('/auth', auth);
const profile = require('./profiles/consultant');
app.use('/profileConsultant', profile);

const filter = require('./filter/filterconsutlant');
app.use('/filter', filter);
const chatBox = require('./chatBox/message');
app.use('/chatBox', chatBox);
var publicDir = require('path').join(__dirname, '/uploads');
app.use(express.static(publicDir));






mongoose.connect('mongodb://localhost:27017/expert', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log('connected to database successfully')
  } else {
    console.log('error while connection')
  }
});
http.listen(port);

