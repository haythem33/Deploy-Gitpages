const mongoose = require ('mongoose');

const ConversationSchema = mongoose.Schema({
  conversation: [{
    from : {type: mongoose.Schema.Types.ObjectId, ref:''},
    to: String,
    message : String,
    date: Date,
  }]
})
module.exports = ConversationSchema

