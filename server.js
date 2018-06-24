const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./app/db-connection').connect;
const routes = require('./app/routes/budget.routes');
const app = express();

const APP_PORT = 3000;
// Adds parsing body of the request to the app
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(APP_PORT);
connectToDB().then(
  () => {
    console.log('Connected to DB');
  },
  err => {
    console.log('Error connecting to DB');
    console.log(err);
  }
);

routes(app);
