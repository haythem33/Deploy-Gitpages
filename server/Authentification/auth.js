const express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('node-bcrypt');
const app = express();
const router = require('express').Router();
const port = process.env.port || 4000;


//importation des models//

var Consultant = require('./../models/consultant');
var ConsultantModel = mongoose.model('consultant', Consultant);
var Company = require('./../models/company');
var CompanyModel = mongoose.model('company', Company);

// Enregistrement nouveau consultant //
router.post('/register/consultant', async (req, res) => {
  var consultant = new ConsultantModel();
  consultant.firstname = req.body.firstnameValue;
  consultant.lastname = req.body.lastnameValue;
  resultRegister = await ConsultantModel.findOne({email: req.body.email});
  if (!resultRegister) {
    consultant.email = req.body.emailValue;
    req.body.password = bcrypt.hashSync(req.body.passwordValue, 10);
    consultant.password = req.body.password;
    consultant.save((err, doc) => {
      if (!err) {
        res.send({message: "a new consultant is successfully added", status: 200});
      } else {
        res.send({message: "email already exists !!!", status: 500})

      }
    })
  }
});
// Enregistrement nouvelle société //
router.post('/register/company', async (req, res) => {
  var company = new CompanyModel();
  company.companyname = req.body.companynameValue;
  resultRegister = await CompanyModel.findOne({email: req.body.email});
  if (!resultRegister) {
    company.email = req.body.emailValue;
    req.body.password = bcrypt.hashSync(req.body.passwordValue);
    company.password = req.body.password;
    company.save((err, doc) => {
      if (!err) {
        res.send({message: "a new conpany is successfully added", status: 200});
      } else {
        res.send({message: "email already exists !!!", status: 500})

      }
    })
  }
});



router.listen(port, function (err, response) {
  console.log('started at port number : ', port);
});

module.exports = router;

