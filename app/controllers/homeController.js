angular
  .module('HomeController', ['ngRoute', 'rowFactory', 'databaseFactory', 'sortFactory'])
  .controller('HomeController', ['$scope', '$window', 'rowFactory', 'databaseFactory', 'sortFactory','$http', HomeController]);

function HomeController($scope, $window, rowFactory, databaseFactory, sortFactory, $http) {
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
  });

  $scope.searchTerm = null;
  $scope.$watch(function () { return sortFactory.search }, function (oldVal, newVal) {
    // console.log('seraching:', $scope.searchTerm);
    $scope.searchTerm = sortFactory.search;
  });

  $scope.colSortName = null;
  $scope.sortName = null;
  $scope.$watch(function () { return sortFactory.colName }, function (oldVal, newVal) {
    if (sortFactory.sort === 'Descending') {
      console.log('Descending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = true;
    } else {
      console.log('Ascending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = false;
    }
  });

  $scope.$watch(function () { return sortFactory.sort }, function (oldVal, newVal) {
    if (sortFactory.sort === 'Descending') {
      console.log('Descending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = true;
    } else {
      console.log('Ascending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = false;
    }
  });

  // JIMMY
  $scope.newRecord = {
    data: {}
  };
  $scope.addRecord = function() {
    var body = $scope.newRecord;
    body.tableName = rowFactory.tableName;
    body.url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;
    console.log(body);
    $http.post('/addRecord', body).then(function (res) {
      // $window.location('/');
      // var data = res.data;
      // console.log('before', recordFactory.record);
      // recordFactory.record = data;
      // console.log('after', recordFactory.record);
    });
  }
}