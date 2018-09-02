const mongoose = require('mongoose');
const productionDbUrl = require('../config/db').url;
const testDbUrl = require('../config/test-db').url;

function connect() {
  const dbLogin = process.env.DB_LOGIN;
  const dbPass = process.env.DB_PASS;
  if (!dbLogin || !dbPass) throw new Error('No database credentials provided');
  return mongoose.connect(
    `mongodb://${dbLogin}:${dbPass}@ds141401.mlab.com:41401/expense-manager`
  );
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
