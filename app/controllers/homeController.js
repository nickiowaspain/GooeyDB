angular
  .module('HomeController', ['ngRoute', 'rowFactory', 'databaseFactory'])
  .controller('HomeController', ['$scope', 'rowFactory', 'databaseFactory', '$http', HomeController]);

function HomeController($scope, rowFactory, databaseFactory, $http) {
  // SCOT
  $scope.rows = rowFactory.rows;
  $scope.columnNames = [];
  $scope.$watch(function () { return rowFactory.rows }, function (oldVal, newVal) {
    if (newVal) {
      $scope.rows = rowFactory.rows;
      $scope.columnNames = Object.keys($scope.rows[0]);
      console.log('Rows changed')
    }
    if (oldVal) {
      console.log('No change')
    }
  })

  // JIMMY
  $scope.newRecord = {
    data: {}
  };
  $scope.addRecord = function() {
    var body = $scope.newRecord;
    body.tableName = rowFactory.tableName;
    body.url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;
    console.log(body);
    $http.post('/addRecord', body).then(function(res) {
      // var data = res.data;
      // console.log('before', recordFactory.record);
      // recordFactory.record = data;
      // console.log('after', recordFactory.record);
    });
  }
}