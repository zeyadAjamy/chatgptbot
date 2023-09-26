require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const db = require('./db/connection');
const { listChats } = require('./interactions/list-chats');
const { startNewChat } = require('./interactions/start');
const { retrieveMessages } = require('./interactions/retrieve-chat');
const { sendMessage } = require('./interactions/messaging');

// Initialize Telegram Bot connection
const telegramToken = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(telegramToken, { polling: true });

// Initialize MongoDB connection
db.connect();

// Listen for Telegram messages
bot.on('message', (msg) => {
     const chatId = msg.chat.id;
     const message = msg.text.trim();

     // Check if the message is a command
     let reply = '';
     if (message.startsWith('/')) {
          // Extract the command and the arguments
          const [command, ...args] = message.split(' ');
          // Check if the command is known
          switch (command) {
               case '/start':
                    // Start a new chat
                    reply = startNewChat(chatId);
                    break;
               case '/list':
                    // List all chats
                    reply = listChats(chatId);
                    break;
               case '/retrieve':
                    // Retrieve messages from a chat
                    reply = retrieveMessages(chatId, args[0]);
                    break;
               default:
                    reply = 'Unknown command! Please try one of the following: /start, /list, /retrieve';
          }
     } else {
          reply = sendMessage(chatId, message);
     }

     bot.sendMessage(chatId, reply);
});
