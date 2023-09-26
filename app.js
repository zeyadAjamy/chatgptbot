require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const db = require('./db/connection');
const listChats = require('./interactions/list-chats');
const { register, createNewChatHandler } = require('./interactions/start');
const { retrieveMessages, getHistory } = require('./interactions/retrieve-chat');
const sendMessage = require('./interactions/messaging');

// Initialize Telegram Bot connection
const telegramToken = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(telegramToken, { polling: true });

// Initialize MongoDB connection
db.connect();

const handleCommand = async (command, args, userId) => {
     let reply = '';
     switch (command) {
          case '/register':
          case '/start':
               // Register user and start a new chat
               reply = await register(userId);
               break;
          case '/new':
               // Start a new chat
               reply = await createNewChatHandler(userId);
               break;
          case '/list':
               // List all chats
               reply = await listChats(userId);
               break;
          case '/retrieve':
               // Retrieve messages from a chat
               reply = await retrieveMessages(userId, args[0]);
               break;
          case '/history':
               // Retrieve messages from a chat
               reply = await getHistory(userId);
               break;
          default:
               reply = 'Unknown command! Please try one of the following: /start, /register, /new, /list, /retrieve, /history';
     }
     return reply;
}

// Listen for Telegram messages
bot.on('message', async (msg) => {
     const chatId = msg.chat.id;
     const message = msg.text.trim();

     // Check if message is a command
     if (message.startsWith('/')) {
          const [command, ...args] = message.split(' ');
          const reply = await handleCommand(command, args, chatId);
          bot.sendMessage(chatId, reply);
          return;
     }
     const reply = await sendMessage(chatId, message);
     bot.sendMessage(chatId, reply);
});
