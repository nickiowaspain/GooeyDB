angular
  .module('HomeController', ['ngRoute', 'rowFactory'])
  .controller('HomeController', ['$scope', 'rowFactory', HomeController]);

function HomeController($scope, rowFactory) {
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
  $scope.newRecord = {}
  $scope.addRecord = function() {
    var obj = $scope.newRecord;
    console.log('OBJ', obj);
    $scope.numberOfCols = $scope.columnNames.length;
    $scope.columnNames.forEach(function(column) {
      $scope.newRecord[column] = '';
    });
    console.log($scope.columnNames);
    console.log($scope.numberOfCols);
    console.log('HEY', obj);

    // const data = {
    //   tableName: rowFactory.tableName,
    //   columnNames: $scope.columnNames,
    //   values: $scope.newRecord
    // }
    // $http.post('/addRecord', data).then(function(res) {
    //   var thing = res.data;
    //   console.log('before', recordFactory.rows);
    //   recordFactory.data = thing;
    //   console.log('after', recordFactory.rows);
    //   recordFactory.data = data;
    // });
  }
}