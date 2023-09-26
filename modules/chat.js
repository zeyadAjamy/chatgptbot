const Chat = require('../db/schemas').Chat;

const isChatRegistered = async (chatId) => {
     try {
          const chat = await Chat.findOne({ chatId });
          return chat ? true : false;
     } catch (error) {
          console.log(error);
     }
     return false;
}

const createNewChat = async (chat) => {
     try {
          const newChat = new Chat(chat);
          await newChat.save();
          return true;
     } catch (error) {
          console.log(error);
     }
     return false;
}

const addMessageToChat = async (chatId, message) => {
     try {
          const chat = await Chat.findOne({ chatId });
          chat.messages.push(message);
          await chat.save();
          return true;
     } catch (error) {
          console.log(error);
     }
     return false;
}

const retriveOldMessages = async (chatId) => {
     try {
          const chat = await Chat.findOne({ chatId });
          return chat.messages;
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
     retrieveChatList
}