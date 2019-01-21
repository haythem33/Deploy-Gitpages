const router = require('express').Router();
var mongoose = require('mongoose');
var Consultant = require('./../models/consultant');
var ConsultantModel = mongoose.model('consultant', Consultant);
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
})
// upload image
router.post('/upload', upload.single('file'), function (req, res, next) {
  res.send(req.file);
});

// add aboutme
router.post('/postProfile/:code', async (req,res)=> {
  let aboutMe = req.body;
  let code = {code : req.params.code}
  console.log(aboutMe);
  const resultat = await ConsultantModel.findOneAndUpdate(code, {$set: {aboutme: aboutMe}});
  const getresultat = await ConsultantModel.findOne({code :req.params.code});
  res.send(getresultat);
});
// get profile
router.get('/getProfile/:code', async (req,res) => {
  const getresultat = await ConsultantModel.findOne({code :req.params.code});
    res.send(getresultat);
});
// add exp
router.post('/exp/:code' , async (req,res) => {
  let code = {code : req.params.code};
  const resultat = await ConsultantModel.updateOne(code, {$addToSet: { experience : req.body}});
  const getresultat = await ConsultantModel.findOne({code: req.params.code});
  res.send(getresultat);
});
// update exp
router.put('/exp/update/:code/:index', async (req,res)=> {
  let code = {code : req.params.code};
  const resultat = await ConsultantModel.updateOne(code, {$set: {['experience.'+ req.params.index]: req.body}});
  const getresultat = await ConsultantModel.findOne({code: req.params.code});
  res.send(getresultat);
});
// push disponibilite
router.post ('/dispo/:code', async (req,res)=> {
  let code = {code : req.params.code};
  console.log(req.body);
  const resultat = await ConsultantModel.findOneAndUpdate(code, {$set: {Disponibilité: req.body.dispo}});
  const getresultat = await ConsultantModel.findOne({code: req.params.code});
  res.send(getresultat);

});
// post Categorie
router.post ('/Categorie/:code', async (req,res)=> {
  let code = {code : req.params.code};
  const resultat = await ConsultantModel.findOneAndUpdate(code, {$set: {Categorie: req.body.dispo}});
  const getresultat = await ConsultantModel.findOne({code: req.params.code});
  res.send(getresultat);

});
// post skills
router.post('/skills/:code', async (req,res) => {
let code = {code: req.params.code};
console.log(req.body);
const resultat = await ConsultantModel.findOneAndUpdate(code, {$set : {skills : req.body}});
const getresultat = await ConsultantModel.findOne({code: req.params.code});
res.send(getresultat);
});

module.exports = router
