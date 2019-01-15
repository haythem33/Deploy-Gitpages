const express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
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
  consultant.consultantfirstname = req.body.consultantfirstname;
  consultant.consultantlastname = req.body.consultantlastname;
  console.log(consultant.consultantfirstname);
  console.log(consultant.consultantlastname);
  resultRegister = await ConsultantModel.findOne({email: req.body.consultantemail});
  if (!resultRegister) {
    consultant.consultantemail = req.body.consultantemailValue;
    req.body.consultantpassword = bcrypt.hashSync(req.body.consultantpasswordValue);
    consultant.consultantpassword = req.body.consultantpassword;
    consultant.consultantstatu = req.body.consultantstatu;
    consultant.save((err, doc) => {
      if (!err) {
        res.send({message: "a new consultant is successfully added", status: 200});
      } else {
        res.send({message: "email already exists !!!", status: 500})

      }
    })
  }
});
router.post('/login/company', async (req, res) => {
  resultLogin = await CompanyModel.findOne({email: req.body.companyemail });
  console.log(req.body.companypassword);
  if (!resultLogin) {
    res.send({ message: 'user not found' });
  }
  if (!bcrypt.compareSync(req.body.companypassword, resultlogin.password)) {
    res.send({ message: 'bad password' })
  }
  else { res.send({ message: 'ok', Token : jwt.sign({data:resultLogin},'my_secret')})
  jwt.verify() }

});
// Enregistrement nouvelle société //
router.post('/register/company', async (req, res) => {
  var company = new CompanyModel();
  company.companyname = req.body.companyname;
  resultRegister = await CompanyModel.findOne({email: req.body.companyemail});
  console.log(req.body.companyemail);
  if (!resultRegister) {
    company.companyemail = req.body.companyemail;
    req.body.companypassword = bcrypt.hashSync(req.body.companypassword);
    console.log(req.body.companypassword);
    company.companypassword = req.body.companypassword;
    company.companystatu = req.body.companystatu;
    console.log(company.companyemail);
    console.log(company.companyname);
    company.save((err, doc) => {
      if (!err) {
        res.send({message: "a new conpany is successfully added", status: 200});
      } else {
        res.send({message: "email already exists !!!", status: 500})

      }
    })
  }
});




module.exports = router;

