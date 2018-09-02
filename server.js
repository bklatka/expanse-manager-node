const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./app/db').connect;
const routes = require('./app/routes/budget.routes');
const app = express();

const APP_PORT = 3000;
// Adds parsing body of the request to the app
app.use(bodyParser.json());
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  next();
});

routes(app);
