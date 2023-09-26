const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
     userId: {
          type: Number, // Use String for UUID
          required: true,
          unique: true,
     },
     state: {
          type: String,
          enum: ['ALLOWED', 'BLOCKED'],
          default: 'ALLOWED',
     },
     currentChatId: {
          type: String,
          default: null,
     },
     createdAt: {
          type: Date,
          default: Date.now, // Pass a function reference for default value
     },
});

const messageSchema = new mongoose.Schema({
     chatId : {
          type: String, // Use String for chatId
          required: true,
     },
     text: {
          type: String,
          required: true,
     },
     response: {
          type: String,
          required: true,
     },
     createdAt: {
          type: Date,
          default: Date.now, // Pass a function reference for default value
     },
});

const chatSchema = new mongoose.Schema({
     chatId: {
          type: String, // Use String for chatId
          default: uuid.v4, // Pass a function reference for default value
          unique: true,
     },
     userId: {
          type: Number,
          required: true,
     },
     messages: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Message',
     }],
     createdAt: {
          type: Date,
          default: Date.now, // Pass a function reference for default value
     },
});

const Message = mongoose.model('Message', messageSchema);
const Chat = mongoose.model('Chat', chatSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
     User,
     Chat,
     Message,
};
