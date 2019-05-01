const router = require('express').Router();
var mongoose = require('mongoose');
var Conversation = require('./../models/conversation');
var ConversationModel = mongoose.model('conversation', Conversation);
var User = require('./../models/user');
var UserModel = mongoose.model('user', User);
// envoyer Message

 router.post('/message', async (req, res)  => {
  const getConversation = await ConversationModel.findOne({ userOne: req.body.userOne, userTwo: req.body.userTwo });
  const getConversation2 = await ConversationModel.findOne({ userOne: req.body.userTwo, userTwo: req.body.userOne });
  if (getConversation) {
    const setMessage = await ConversationModel.updateOne(getConversation, { $addToSet: { messages: req.body.messages } });
    res.send(setMessage);
     req.app.io.emit('sendMessage');
  }
  else if (getConversation2) {
    const setMessage = await ConversationModel.updateOne(getConversation2, { $addToSet: { messages: req.body.messages } });
    res.send(setMessage);
     req.app.io.emit('sendMessage');

  }
  else {
    var conversation = new ConversationModel();
    conversation.userOne = req.body.userOne;
    conversation.userTwo = req.body.userTwo;
    conversation.messages = req.body.messages
    conversation.save();
    res.send(conversation);
     req.app.io.emit('sendMessage');
  }
});

  router.get('/message/:id', async (req, res) => {
    const messageId = [];
    const getMessage = await ConversationModel.find({ userOne: req.params.id });
    const getMessage2 = await ConversationModel.find({ userTwo: req.params.id });
    for (j = 0; j < getMessage.length; j++) {
      messageId.push(getMessage[j].userTwo);
    }
    for (i = 0; i < getMessage2.length; i++) {
      messageId.push(getMessage2[i].userOne);
    }
    res.send(messageId);
    req.app.io.emit('getAllMessage', messageId);



  });
  router.post('/conversation/:id', async (req, res) => {
    const getConversation = await ConversationModel.findOne({ userOne: req.params.id, userTwo: req.body.id });
    const getConversation2 = await ConversationModel.findOne({ userOne: req.body.id, userTwo: req.params.id });
    if (getConversation) {
      res.send(getConversation);

      req.app.io.emit('privateMessage', getConversation);
    } else {
      res.send(getConversation2);
      req.app.io.emit('privateMessage', getConversation2);
    }
  });
  module.exports = router
