angular
.module('DatabaseSelector', ['ngCookies', 'databaseFactory'])
.controller('selectCtrl', ['$scope', '$cookies', 'databaseFactory', function($scope, $cookies, databaseFactory) {
  $scope.rawCookies = $cookies.getAll();
  $scope.dbs = Object.keys($scope.rawCookies).map(function(x) { return x.slice(6) });
  $scope.databaseObjects = $scope.dbs.map(function(name) {
    return $scope.rawCookies[`gooey:${name}`].split('%')
  })
  .map(function(arr) {
    return {
      user: arr[1],
      pass: arr[2],
      url: arr[3],
      db: arr[4]
    }
  });
  $selectedTestAccount = null;
  $scope.active = '';
  $scope.activeConnectInfo = {};
  $scope.load = function() { 
    $scope.active = document.getElementById('drop-down').value.slice(7);
    var obj = $scope.databaseObjects.filter(function(obj) {
      return obj.user === $scope.active;
    })[0];
    databaseFactory.dbName = obj.db,
    databaseFactory.user = obj.user,
    databaseFactory.pass = obj.pass,
    databaseFactory.url = obj.url
    // console.log(databaseFactory.dbName);
    // console.log(databaseFactory.user);
    // console.log(databaseFactory.pass);
    // console.log(databaseFactory.url);

  }
}])
.directive('databaseSelector', function() {
  return {
    templateUrl: './partials/databaseSelector.html' 
  }
});