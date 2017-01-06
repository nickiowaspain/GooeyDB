angular
  .module('Breadcrumbs', ['databaseFactory', 'rowFactory'])
  .controller('BreadCrumbs', ['$scope', 'databaseFactory', 'rowFactory', function ($scope, databaseFactory, rowFactory) {
    //set variables for breadcrumb trail
    $scope.dbname = 'Database';
    $scope.tablename = 'Table';
    $scope.rowid = 'test';
    $scope.columnname = 'test';

    //watch the dataBaseFactory for changes in dbname and then update scope.dbname
    $scope.$watch(function() { return databaseFactory.dbName }, function() {
      $scope.dbname = databaseFactory.dbName;
    });

    //watch the rowfactory for changes in tablename and then update scope.tablename
    $scope.$watch(function() { return rowFactory.tableName }, function() {
      $scope.tablename = rowFactory.tableName;
    });
  }])
  .directive('breadcrumbs', function() {
    return {
      templateUrl: './partials/breadcrumbs.html' 
    }
  });
