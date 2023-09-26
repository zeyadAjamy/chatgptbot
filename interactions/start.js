const { isUserRegistered, registerUser, isUserAllowed, assignChatId } = require('../modules/users');
const { addMessageToChat } = require('../modules/chat');
const { createNewChat } = require('../modules/chat');
const { User, Message } = require('../db/schemas');

const register = async (userId) => {
     // Create new user if not exist
     const user = new User({ userId });
     const isRegistered = await isUserRegistered(userId);
     if (!isRegistered) {
          // Register user
          await registerUser(user);
          // Create new chat and return chatId
          const chatId = await createNewChat(userId);
          // Assign chatId to user
          await assignChatId(userId, chatId);
          // Add message to chat
          const message = new Message({ chatId, text: '/start', response: 'Hello, How can I assist you today?' });
          await addMessageToChat(chatId, message);
     }
     // Check if user is allowed to chat
     const isAllowed = await isUserAllowed(userId);
     if (!isAllowed) {
          return 'Sorry, you are not allowed to chat with me.';
     }
     // Send welcome message
     return 'Hello, How can I assist you today?';
}

const createNewChatHandler = async (userId) => {
     // check if user is allowed
     const isAllowed = await isUserAllowed(userId) && await isUserRegistered(userId);

     if (!isAllowed) {
          return 'Sorry, you are not allowed to chat with me.';
     }

     // create new chat
     const chatId = await createNewChat(userId);

     // assign chatId to user
     await assignChatId(userId, chatId);

     // add message to chat
     const message = new Message({ chatId, text: '/new', response: 'Hello, How can I assist you today?' });
     await addMessageToChat(chatId, message);

     return 'New Chat is Created.\nHello, How can I assist you today?';
}

module.exports = { register, createNewChatHandler };
