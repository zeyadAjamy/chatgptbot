const { isUserRegistered, registerUser, isUserAllowed } = require('../modules/users');
const User = require('../db/schemas').User;

const startNewChat = async (userId) => {
     // Create new user if not exist
     const user = new User({ userId });
     const isRegistered = await isUserRegistered(userId);
     if (!isRegistered) {
          await registerUser(user);
     }
     // Check if user is allowed to chat
     const isAllowed = await isUserAllowed(userId);
     if (!isAllowed) {
          return 'Sorry, you are not allowed to chat with me.';
     }
     // Send welcome message
     return 'Hello, How can I assist you today?';
}

module.exports = startNewChat;