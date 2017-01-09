angular
  .module('databaseFactory', [])
  .factory('databaseFactory', function () {
    return {
      dbName: 'users',
      user: 'me',
      password: 'computer',
      url: 'localhost'
    }
  });




  
