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
  profiltitle: {
    type: String
  },
  aboutme: [{
    name: String,
    lastname: String,
    telephone: Number,
    photo: String,
    adresse: String,
  }],
  experience: [{
   Duration: Number,
   CompanyName: String,
   Description: String,
}],
Disponibilité: {
  type: String,
},
Categorie: {
  type: String,
},
statut: {
  type: String,
}
})
module.exports = ConsultantSchema;
