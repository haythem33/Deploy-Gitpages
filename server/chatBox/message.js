const router = require('express').Router();
var mongoose = require('mongoose');
var Conversation = require('./../models/conversation');
var ConversationModel = mongoose.model('conversation', Conversation);

router.post('/message', async (req,res)=> {
  const conversation = new ConversationModel();
  conversation.conversation = req.body
  res.send(conversation);
  console.log(conversation);
  conversation.save();
})



module.exports = router
