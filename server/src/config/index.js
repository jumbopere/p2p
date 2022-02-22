require('dotenv').config();

module.exports = {
  dbUrl: process.env.DB_URL,
  secret: process.env.APP_SECRET,
};
