const mongoose = require ('mongoose');

var ConsultantSchema = mongoose.Schema({
  code : {
    type : String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  statut: {
    type: String
  },
})
module.exports = ConsultantSchema;
