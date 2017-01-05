// const connectVars = require('./../app/directives/dbConnect');
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://connectVars.data.username:connectVars.data.password@connectVars.data.url:5432/connectVars.data.dbname');

// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
//   });

// const retrieve = require('./retrieve_method');
// const dbConnect = require('./dbConnect');

module.exports = {
  // retrieve : retrieve.retrieve,
  // dbConnect: dbConnect.dbConnect
};
