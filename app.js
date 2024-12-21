const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./src/routes/routes');
app.use('/', routes);

module.exports = app;
