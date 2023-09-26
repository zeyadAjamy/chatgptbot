const { isUserRegistered, isUserAllowed, getCurrentChatId } = require('../modules/users');
const { addMessageToChat } = require('../modules/chat');
const { Message } = require('../db/schemas');
const { getGPTResponse } = require('../modules/chatgpt');

const sendMessage = async (userId, message) => {
     // Check if the user is registered and allowed to chat
     const allowed = await isUserAllowed(userId) && await isUserRegistered(userId);
     if (!allowed) {
          return "You are not allowed to chat! Please register first. Use /start to register."
     }
     
     // Get the current chatId
     const chatId = await getCurrentChatId(userId);

     // Get the response from GPT
     const response = await getGPTResponse(message, userId);
     const messageStatus = !!response; // If response is null, message failed to send

     if (!messageStatus) {
          return "Message failed to send!";
     }

     // Add the message and the response to the database
     const newMessage = new Message({
          chatId,
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
