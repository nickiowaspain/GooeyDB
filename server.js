'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models/model');
const Sequelize = require('sequelize');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.post('/addRecord', models.addRecord);

app.post('/connect', function (req, res, done) {
  var data = req.body;

//connect to elephant
  const sequelize = new Sequelize(`postgres://${data.username}:${data.password}@${data.url}:5432/${data.dbname}`);
  sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });
});

app.post('/getTables', models.retrieveTables);

app.post('/getTable', models.retrieveTable);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));