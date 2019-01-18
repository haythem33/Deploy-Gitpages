const express = require('express');
var mongooose = require('mongoose');
const router = require('express').Router();



var Consultant = require('./../models/consultant');
var ConsultantModel = mongooose.model('consultant', Consultant);



router.get('/consultant', async(req,res) =>{
  const consultant = await ConsultantModel.find(req.body)
  res.send(consultant);
});













module.exports = router;
