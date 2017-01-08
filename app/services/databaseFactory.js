angular
  .module('databaseFactory', [])
  .factory('databaseFactory', function () {
    return {
      dbName: 'Database',
      user: '',
      password: '',
      url: ''
    }
  });




  
