const mongoose = require('mongoose');
const productionDbUrl = require('../config/db').url;
const testDbUrl = require('../config/test-db').url;

function connect(env = 'prod') {
  const url = env === 'test' ? testDbUrl : productionDbUrl;
  return mongoose.connect(url);
}

function dropCollection(collectionName) {
  const collection = mongoose.connection.collections[collectionName];
  if (collection) return collection.drop();
  return Promise.reject('Cannot drop collection');
}


module.exports = {
  connect: connect,
  dropCollection: dropCollection
};
