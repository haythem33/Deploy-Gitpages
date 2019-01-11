const mongoose = require ('mongoose');

var ConsultantSchema = mongoose.Schema({
  consultantfirstname : {
    type: String,
  },
  consultantlastname : {
    type: String,
  },
  consultantemail : {
    type: String,
    unique: true
  },
  consultantpassword : {
    type: String,
  },
  consultantstatu : {
    type: String,
   }
})

module.exports= ConsultantSchema;
