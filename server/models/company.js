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
  },
  companypassword : {
    type: String,
  },
  companystatut: {
    type: String
  },
  user : {type: mongoose.SchemaTypes.ObjectId, ref:'user'},
})

module.exports= CompanySchema;
