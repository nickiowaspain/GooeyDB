angular
  .module('Breadcrumbs', ['databaseFactory'])
  .controller('BreadCrumbs', ['$scope', 'databaseFactory', function ($scope, databaseFactory) {

    $scope.dbname = 'test';
    $scope.tablename = 'test';
    $scope.rowid = 'test';
    $scope.columnname = 'test';

    $scope.$watch(function() { return databaseFactory.dbName }, function() {
      $scope.dbname = databaseFactory.dbName;
    });
  }])
  .directive('breadcrumbs', function() {
    return {
      templateUrl: './partials/breadcrumbs.html' 
    }
  });
