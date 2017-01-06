angular
  .module('ActionBar', ['rowFactory', 'sortFactory'])
  .controller('ActionBar', ['$scope', 'rowFactory', 'sortFactory', function ($scope, rowFactory, sortFactory) {
    // column selector
    $scope.currentCol = null;
    $scope.rows = rowFactory.rows;
    $scope.columnNames = [];
    $scope.$watch(function() {return rowFactory.rows}, function(newVal, oldVal) {
      // console.log('watching from actionBar');
      if (rowFactory.rows) {
        $scope.rows = rowFactory.rows;
        $scope.columnNames = Object.keys($scope.rows[0]);
        console.log('col names:', $scope.columnNames);
      }
    });

    // sort selector
    $scope.currentSort = null;
    $scope.sortNames = ['Ascending', 'Descending'];
    $scope.sortSelect = function() {
      // console.log($scope.currentSort);
      sortFactory.colName = $scope.currentCol;
      sortFactory.sort = $scope.currentSort;
    }

    // search functionality
    $scope.searchTerm = '',
    $scope.search = function() {
      // console.log($scope.searchTerm);
      sortFactory.search = $scope.searchTerm;
    };

  }])
  .directive('actionBar', function() {
    return {
      templateUrl: './partials/actionBar.html' 
    }
  });
