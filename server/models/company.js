const mongoose = require ('mongoose');

var CompanySchema = mongoose.Schema({
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
  companystatu : {
    type: String,
   }
})

module.exports= CompanySchema;
