angular
  .module('ActionBar', ['rowFactory', 'sortFactory'])
  .controller('ActionBar', ['$scope', 'rowFactory', 'sortFactory', function ($scope, rowFactory, sortFactory) {
    // drop down menu that grabs columns by watching rowFactory. gets column names by doing object.keys for the first record.
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

    // drop down menu for sorting by ascending or descending. when selecting an option for sort direction or column name sortselect() grabs variables from scope and saves to sortfactory
    $scope.currentSort = null;
    $scope.sortNames = ['Ascending', 'Descending'];
    $scope.sortSelect = function() {
      // console.log($scope.currentSort);
      sortFactory.colName = $scope.currentCol;
      sortFactory.sort = $scope.currentSort;
    }

    // search functionality (filter) that saves search term to sortFactory
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
