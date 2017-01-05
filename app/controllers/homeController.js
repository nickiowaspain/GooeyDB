angular
  .module('HomeController', ['ngRoute', 'rowFactory'])
  .controller('HomeController', ['$scope', 'rowFactory', function ($scope, rowFactory) {
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
  }]);

