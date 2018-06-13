const mongoose = require('mongoose');
const dbConnectionString = require('../config/db').url;

module.exports = () => {
  mongoose.connect(dbConnectionString);
  mongoose.connection
    .once('open', () => {
      console.log('Connected to DB');
    })
    .once('error', err => {
      console.error('Error connecting to DB');
    });
};
