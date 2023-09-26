const User = require('../db/schemas').User;

const isUserRegistered = async (userId) => {
     try {
          const user = await User.findOne({ userId });
          return user ? true : false;
     } catch (error) {
          console.log(error);
     }
     return false;
}

const isUserAllowed = async (userId) => {
     try {
          const user = await User.findOne({ userId });
          return user.state === 'ALLOWED' ? true : false;
     } catch (error) {
          console.log(error);
     }
     return false;
}

const registerUser = async (user) => {
     try {
          await user.save();
          return true;
     } catch (error) {
          console.log(error);
     }
     return false;
}

module.exports = {
     isUserRegistered,
     isUserAllowed,
     registerUser
}
