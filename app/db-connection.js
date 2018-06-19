const mongoose = require('mongoose');
const dbConnectionString = require('../config/db').url;

module.exports.connect = callback => {
  mongoose.connect(dbConnectionString);
  mongoose.connection
    .once('open', () => {
      console.log('Connected to DB');
      callback();
    })
    .once('error', err => {
      console.error('Error connecting to DB');
    });
};

module.exports.dropCollection = collectionName => {
  const collection = mongoose.connection.collections[collectionName];
  if (collection) return collection.drop();
  return Promise.reject('Cannot drop collection');
};
