const express = require('express');
const cors = require('cors');
const routes = require('./routes').default;
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(bodyParser.json());

module.exports = app;