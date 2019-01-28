const router = require('express').Router();
var mongoose = require('mongoose');
var Conversation = require('./../models/conversation');
var ConversationModel = mongoose.model('conversation', Conversation);
var User = require('./../models/user');
var UserModel = mongoose.model('user', User);
// envoyer Message
router.post('/message', async (req,res)=> {
const getConversation = await ConversationModel.findOne({userOne : req.body.userOne, userTwo : req.body.userTwo});
const getConversation2 =  await ConversationModel.findOne({userOne: req.body.userTwo, userTwo : req.body.userOne});
if (getConversation) {
const setMessage = await ConversationModel.updateOne(getConversation, {$addToSet: { messages : req.body.messages}});
res.send(setMessage);
}
else if (getConversation2) {
const setMessage = await ConversationModel.updateOne(getConversation2, {$addToSet: { messages : req.body.messages}});
res.send(setMessage);
}
 else  {
  var conversation = new ConversationModel();
  conversation.userOne = req.body.userOne;
  conversation.userTwo = req.body.userTwo;
  conversation.messages = req.body.messages
  conversation.save();
  res.send(conversation);
}
});



module.exports = router
