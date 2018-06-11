const express = require('express');
const MongoDBClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const APP_PORT = 3000;

const routes = require('./app/routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
routes(app, {});
app.listen(APP_PORT, () => {
  console.log('Server running on port ' + APP_PORT);
});
