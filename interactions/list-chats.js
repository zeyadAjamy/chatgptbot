const { isUserRegistered, isUserAllowed } = require('../modules/users');
const { retrieveChatList } = require('../modules/chat');

const listChats = async (userId) => {
     // Check if the user is registered and allowed to chat
     const allowed = await isUserAllowed(userId) && await isUserRegistered(userId);
     if (!allowed) {
          return "You are not allowed to list chats! Please register first. Use /register to register.";
     }
     // Retrieve all chats ids for that userId
     const chats = await retrieveChatList(userId);
     if (chats.length === 0) {
          return "No chats to list!";
     }
     return chats.map(chat => chat.chatId).join('\n');
}

module.exports = listChats;