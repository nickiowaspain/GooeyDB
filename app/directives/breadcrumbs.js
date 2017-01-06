angular
  .module('Breadcrumbs', ['databaseFactory', 'rowFactory'])
  .controller('BreadCrumbs', ['$scope', 'databaseFactory', 'rowFactory', function ($scope, databaseFactory, rowFactory) {

    $scope.dbname = 'Database';
    $scope.tablename = 'Table';
    $scope.rowid = 'test';
    $scope.columnname = 'test';

    $scope.$watch(function() { return databaseFactory.dbName }, function() {
      $scope.dbname = databaseFactory.dbName;
    });

    $scope.$watch(function() { return rowFactory.tableName }, function() {
      $scope.tablename = rowFactory.tableName;
    });
  }])
  .directive('breadcrumbs', function() {
    return {
      templateUrl: './partials/breadcrumbs.html' 
    }
  });
