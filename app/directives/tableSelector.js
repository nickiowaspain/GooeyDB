angular.module('TableSelector', [])
  .controller('tableSelector', ['$scope', '$http', function($scope, $http) {
    // example tableObj
    $scope.tableObj = {
      table1 : 'table1',
      table2 : 'table2', 
      table3 : 'table3'
    };

    // GET request for table triggered by click
    $scope.getTable = function(tName) {
      $scope.tableName = tName;
      console.log('clicking on', $scope.tableName);
      var url = '/table/' + $scope.tableName;
      $http.get(url).then(function(data) {
        var table = data;
        console.log('response:', table);
      });
    };
  }])
  .directive('tableSelector', function() {
    return {
      templateUrl: './partials/tableSelector.html' 
    }
  });
