angular
  .module('HomeController', ['ngRoute', 'rowFactory'])
  .controller('HomeController', ['$scope', 'rowFactory', HomeController]);

function HomeController($scope, rowFactory) {
  $scope.newRecord = {}
  $scope.addRecord = function() {
    $scope.columnNames = Object.keys(rowFactory.rows[0]);
    $scope.numberOfCols = $scope.columnNames.length;
    $scope.columnNames.forEach(function(column) {
      $scope.newRecord[column] = null;
    });
    console.log($scope.columnNames);
    console.log($scope.numberOfCols);
    console.log($scope.one, $scope.two, $scope.three);
    console.log($scope.newRecord);
    console.log('ROWFACTORY', rowFactory);
    const data = {
      tableName: rowFactory.tableName,
      columnNames: $scope.columnNames,
      values: $scope.newRecord
    }
    $http.post('/addRecord', data).then(function(res) {
      var thing = res.data;
      console.log('before', recordFactory.rows);
      recordFactory.data = thing;
      console.log('after', recordFactory.rows);
      recordFactory.data = data;
    });
  }
}
