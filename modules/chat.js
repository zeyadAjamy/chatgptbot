const { Chat, Message } = require('../db/schemas');
const { getCurrentChatId } = require('./users');

const isChatRegistered = async (chatId) => {
     try {
          const chat = await Chat.findOne({ chatId });
          return chat ? true : false;
     } catch (error) {
          console.log(error);
     }
     return false;
}

const createNewChat = async (userId) => {
     try {
          const newChat = new Chat({ userId });
          await newChat.save();
          return newChat.chatId;
     } catch (error) {
          console.log(error);
     }
     return null;
}

// Add message to chat
const addMessageToChat = async (chatId, message) => {
     try {
          const chat = await Chat.findOne({ chatId });
          chat.messages.push(message);
          await Message(message).save();
          await chat.save();
          return true;
     } catch (error) {
          console.log(error);
     }
     return false;
}

// Retrieve specific chat' messages
const retriveOldMessages = async (chatId) => {
     try {
          const chat = await Chat.findOne({ chatId }).populate('messages');
          return chat.messages;
     } catch (error) {
          console.log(error);
     }
     return [];
}

// used by '/history' command
const getCurrentChatHistory = async (userId) => {
     try {
          const currentChatId = await getCurrentChatId(userId);
          const messages = await retriveOldMessages(currentChatId);
          return messages;
     } catch (error) {
          console.log(error);
     }
     return [];
}

const retrieveChatList = async (userId) => {
     try {
          const chats = await Chat.find({ userId });
          return chats;
     } catch (error) {
          console.log(error);
     }
     return [];
}

module.exports = {
     isChatRegistered,
     createNewChat,
     addMessageToChat,
     retriveOldMessages,
     getCurrentChatHistory,
     retrieveChatList
}