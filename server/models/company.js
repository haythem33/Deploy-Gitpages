const mongoose = require ('mongoose');

var CompanySchema = mongoose.Schema({
  companyname : {
    type: String,
  },
  email : {
    type: String,
    unique: true
  },
  password : {
    type: String,
  },
})

module.exports= CompanySchema;
