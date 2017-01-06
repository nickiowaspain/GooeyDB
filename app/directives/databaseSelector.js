angular
.module('DatabaseSelector', ['ngCookies', 'databaseFactory'])
.controller('selectCtrl', ['$scope', '$cookies', 'databaseFactory', function($scope, $cookies, databaseFactory) {
  
  //grab cookies with GooeyDB identifier to populate DB list
  $scope.rawCookies = $cookies.getAll();
  $scope.dbs = Object.keys($scope.rawCookies).map(function (x) { return x.slice(6) });
  
  //breaks up cookie string into connection fields in order to make connection to database
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
  
  //binds select list logic and variables between controller and template
  $scope.selectedTestAccount = null;

  // this would ideally update the db select list with the most recently entered db connection
  // $scope.$watch(function () { return databaseFactory.dbName }, function () {
  //   console.log(databaseFactory.dbName)
  //   $scope.selectedTestAccount = databaseFactory.dbName;
  //     console.log($scope.selectedTestAccount)
  // });

  //populate the database selector dropdown menu with databases from cookies
  $scope.active = '';
  $scope.activeConnectInfo = {};
  $scope.load = function() { 
    $scope.active = document.getElementById('drop-down').value.slice(7);
    var obj = $scope.databaseObjects.filter(function(obj) {
      return obj.db === $scope.active;
    })[0];

    //this saves the selected database credentials to the database factory for use in other modules and http requests to database (used to build connection url for sequilize connection. iteration should get rid of sequilize entirely and just use pg)
    databaseFactory.dbName = obj.db,
    databaseFactory.user = obj.user,
    databaseFactory.pass = obj.pass,
    databaseFactory.url = obj.url
  }
}])
.directive('databaseSelector', function() {
  return {
    templateUrl: './partials/databaseSelector.html' 
  }
});