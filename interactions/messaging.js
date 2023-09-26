const { isUserRegistered, isUserAllowed } = require('../modules/users');
const { addMessageToChat } = require('../modules/chat');
const { Message } = require('../db/schemas');

const sendMessage = async (userId, chatId, message) => {
     // Check if the user is registered and allowed to chat
     const allowed = await isUserAllowed(userId) && await isUserRegistered(userId);
     if (!allowed) {
          return "You are not allowed to chat! Please register first. Use /register to register."
     }

     // TODO: send the user message to the chatgpt api

     const messageStatus = true;
     const response = "This is a response";

     if (!messageStatus) {
          return "Message failed to send!";
     }

     // Add the message and the response to the database
     const newMessage = new Message({
          chat: chatId,
          sender: 'USER',
          text: message,
          response
     });

     const messageAdded = await addMessageToChat(chatId, newMessage);

     if (!messageAdded) {
          return "Something went wrong!";
     }

     return response;
}

module.exports = sendMessage;
