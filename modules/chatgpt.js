const axios = require('axios');
const endpint = 'https://api.openai.com/v1/chat/completions';
const { getCurrentChatId } = require('./users');
const { retriveOldMessages } = require('./chat');

const gptToken = process.env.CHATGPT_TOKEN;

const getGPTResponse = async (message, userId) => {
     const currentChatId = await getCurrentChatId(userId);
     const messages = (await retriveOldMessages(currentChatId)).map((message, i) => {
          if (i == 0) return {
               role: "system",
               content: "You are a helpful assistant.",
          }
          return {
               role: "user",
               constent: message.text,
          }, {
               role: "assistant",
               content: message.response,
          }
     });

     const toBeSent = [
          ...messages,
          { role: "user", content: message },
     ]

     try {
          const response = await axios.post(endpint, {
               model: "gpt-3.5-turbo",
               messages: toBeSent,
          }, {
               headers: {
                    'Authorization': `Bearer ${process.env.CHATGPT_TOKEN}`,
                    'Content-Type': 'application/json',
               }
          });
          return response.data.choices[0].message.content;
     } catch (error) {
          console.log(error);
     }
     return null;
}

module.exports = {
     getGPTResponse,
}