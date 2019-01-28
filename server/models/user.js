const mongoose = require ('mongoose');

const UserSchema = mongoose.Schema({

  username : {
    type : String
  },
  email : {
    type: String
  },
  comp : {type: mongoose.SchemaTypes.ObjectId, ref: 'companies'},
  consul : {type: mongoose.SchemaTypes.ObjectId, ref: 'Consultants'}
})
module.exports = UserSchema
