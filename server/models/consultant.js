const mongoose = require ('mongoose');

var ConsultantSchema = mongoose.Schema({
  code : {
    type : String
  },
  user : {type: mongoose.SchemaTypes.ObjectId, ref:'user'},
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
},
skills : [{
  name: String,
}],
Salary: [{
  day: Number,
  week: Number,
  month: Number,
}],
})
module.exports = ConsultantSchema;
