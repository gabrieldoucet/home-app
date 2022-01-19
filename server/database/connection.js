const mongoose = require('mongoose');
const path = require('path');
mongoose.Promise = global.Promise;

const logger = require(path.join(__dirname, '..', 'helpers', 'logger'));

const connectOptions = {
  loggerLevel: 'warn',
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const DB_SERVER_IP = process.env.DB_SERVER_IP;
const DB_SERVER_PORT = process.env.DB_SERVER_PORT;
const DB_NAME = process.env.DB_NAME;

class Database {
  constructor () {
    const uri = `mongodb://${DB_SERVER_IP}:${DB_SERVER_PORT}/${DB_NAME}`;
    mongoose.connect(uri, connectOptions).then(function () {
      const message = `Connected to ${DB_SERVER_IP}:${DB_SERVER_PORT}/${DB_NAME}`;
      logger.info(message);
    }).catch(function (err) {
      logger.error(err);
    });
  }
}

// Connect to database
module.exports = new Database();
