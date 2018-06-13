const express = require('express');
const bodyParser = require('body-parser');
const connectToDB = require('./app/db-connection');

const app = express();

// Adds parsing body of the request to the app
app.use(bodyParser.urlencoded({ extended: true }));
connectToDB();
