angular
  .module('databaseFactory', [])
  .factory('databaseFactory', function () {
    return {
      dbName: 'users',
      user: 'brianrudloff',
      password: 'wookie42',
      url: 'localhost'
    }
  });

