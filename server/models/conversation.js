const mongoose = require ('mongoose');

const ConversationSchema = mongoose.Schema({
    userOne : {type: mongoose.SchemaTypes.ObjectId, ref:'user'},
    userTwo: {type: mongoose.SchemaTypes.ObjectId, ref:'user'},
    messages : [{
      from : {type: mongoose.SchemaTypes.ObjectId, ref:'user'},
      to : {type: mongoose.SchemaTypes.ObjectId, ref:'user'},
      contenu : String,
      date: String,
    }],

})
module.exports = ConversationSchema

