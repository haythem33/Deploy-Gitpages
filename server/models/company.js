const mongoose = require ('mongoose');

var CompanySchema = mongoose.Schema({
  code : {
    type : String,
  },
  companyname : {
    type: String,
  },
  companyemail : {
    type: String,
    unique: true
  },
  companypassword : {
    type: String,
  },
  companystatut: {
    type: String
  }
})

module.exports= CompanySchema;
