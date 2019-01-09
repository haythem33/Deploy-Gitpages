const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');








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
