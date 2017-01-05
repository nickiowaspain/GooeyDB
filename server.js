'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models/model');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// app.get('/db', models.retrieve);
app.get('/table/:tName', (req, res, next) => {
  const tableName = req.params.tName;
  req.tableName = tableName;
  next();
}, models.retrieveTable);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));