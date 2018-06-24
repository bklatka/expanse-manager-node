const mongoose = require('mongoose');
const dbConnectionString = require('../config/db').url;

module.exports.connect = () => {
  return mongoose.connect(dbConnectionString);
};

module.exports.dropCollection = collectionName => {
  const collection = mongoose.connection.collections[collectionName];
  if (collection) return collection.drop();
  return Promise.reject('Cannot drop collection');
};
