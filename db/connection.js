const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

const connect = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
}

const disconnect = () => {
  mongoose.disconnect()
    .then(() => console.log('MongoDB disconnected'))
    .catch((error) => console.log(error));
}

module.exports = {
  connect,
  disconnect
};