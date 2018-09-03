const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./app/db').connect;
const routes = require('./app/routes/budget.routes');
const app = express();

loadEnv();

const APP_PORT = process.env.PORT || 3000;
// Adds parsing body of the request to the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});
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
  res.setHeader('Access-Control-Allow-Origin', '*'); // TODO: Change this for prod
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

function loadEnv() {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }
}
