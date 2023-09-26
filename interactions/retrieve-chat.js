const { isUserRegistered, isUserAllowed } = require('../modules/users');
const { isChatRegistered, retriveOldMessages } = require('../modules/chat');

const retrieveMessages = async (userId, chatId) => {
     // Check if the user is registered and allowed to chat
     const allowed = await isUserAllowed(userId) && await isUserRegistered(userId);
     if (!allowed) {
          return "You are not allowed to retrieve messages! Please register first. Use /start to register.";
     }
     // Check if the chat exists
     const chatExists = await isChatRegistered(chatId);
     if (!chatExists) {
          return "This chat does not exist!";
     }
     // Retrieve the messages
     const messages = await retriveOldMessages(chatId);
     if (messages.length === 0) {
          return "No messages to retrieve!";
     }
     return messages.map(message => [`User: ${message.text}`, `Bot: ${message.response}`].join('\n'));
}

module.exports = retrieveMessages;
