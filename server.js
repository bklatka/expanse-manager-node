const express = require('express');
const MongoDBClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const APP_PORT = 3000;

const routes = require('./app/routes/index');

app.use(bodyParser.urlencoded({ extended: true }));

MongoDBClient.connect(
  db.url,
  (err, database) => {
    if (err) return console.log(err);
    console.log('Connected to DB');

    routes(app, database);

    app.listen(APP_PORT, () => {
      console.log('We are live on ' + APP_PORT);
    });
  }
);
