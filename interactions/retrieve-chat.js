const { isUserRegistered, isUserAllowed } = require('../modules/users');
const { isChatRegistered, retriveOldMessages, getCurrentChatHistory } = require('../modules/chat');

const retrieveMessages = async (userId, chatId) => {
     // Check if the user is registered and allowed to chat
     const allowed = await isUserAllowed(userId) && await isUserRegistered(userId);
     if (!allowed) {
          return "You are not allowed to retrieve messages! Please register first. Use /register to register.";
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
     return messages.map(message => [`User: ${message.text}`, `Bot: ${message.response}`].join('\n')).join('\n\n');
}

const getHistory = async (userId) => {
     // Check if the user is registered and allowed to chat
     const allowed = await isUserAllowed(userId) && await isUserRegistered(userId);
     if (!allowed) {
          return "You are not allowed to retrieve messages! Please register first. Use /register to register.";
     }
     // Retrieve the messages
     const messages = await getCurrentChatHistory(userId);
     if (messages.length === 0) {
          return "No messages to retrieve!";
     }
     return messages.map(message => [`User: ${message.text}`, `Bot: ${message.response}`].join('\n')).join('\n\n');
}

module.exports = {
     retrieveMessages,
     getHistory
}
