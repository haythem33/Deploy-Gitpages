const router = require('express').Router();
var mongoose = require('mongoose');
var Conversation = require('./../models/conversation');
var ConversationModel = mongoose.model('conversation', Conversation);
var User = require('./../models/user');
var UserModel = mongoose.model('user', User);
const server = require('http').createServer(router);
const io = require('socket.io')(server);
// envoyer Message


router.post('/message', async (req, res) => {
  const getConversation = await ConversationModel.findOne({ userOne: req.body.userOne, userTwo: req.body.userTwo });
  const getConversation2 = await ConversationModel.findOne({ userOne: req.body.userTwo, userTwo: req.body.userOne });
  if (getConversation) {
    const setMessage = await ConversationModel.updateOne(getConversation, { $addToSet: { messages: req.body.messages } });
    res.send(setMessage);
    io.emit('sendMessage', data);
  }
  else if (getConversation2) {
    const setMessage = await ConversationModel.updateOne(getConversation2, { $addToSet: { messages: req.body.messages } });
    res.send(setMessage);
    io.emit('sendMessage', data);

  }
  else {
    var conversation = new ConversationModel();
    conversation.userOne = req.body.userOne;
    conversation.userTwo = req.body.userTwo;
    conversation.messages = req.body.messages
    conversation.save();
    res.send(conversation);
    io.emit('sendMessage', data);
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
    message = messageId;
    io.emit('message', message);



  });
  router.post('/conversation/:id', async (req, res) => {
    const getConversation = await ConversationModel.findOne({ userOne: req.params.id, userTwo: req.body.id });
    const getConversation2 = await ConversationModel.findOne({ userOne: req.body.id, userTwo: req.params.id });
    if (getConversation) {
      privatemessage = getConversation
      res.send(privatemessage);
    } else {
      privatemessage = getConversation2
      res.send(privatemessage);
    }
  });





module.exports = router
