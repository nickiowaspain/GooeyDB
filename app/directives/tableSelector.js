angular.module('TableSelector', ['databaseFactory'])
  .controller('tableSelector', ['$scope', '$http', 'databaseFactory', function($scope, $http, databaseFactory) {

    // GET request for table triggered by click
    $scope.getTable = function(tName) {
      // get database url
      $scope.url = 'postgres://aeqxadhz:qHz6IxCJsV2GXmiQRzEPTU_wj4WufZQh@elmer.db.elephantsql.com:5432/aeqxadhz';
      
      // get the name of the table that was clicked on
      $scope.tableName = tName;

      // put database url and tablename into an object for the POST request
      data = {
        url: $scope.url,
        tableName: $scope.tableName
      };

      $http.post('/getTable', data).then(function(res) {
        var table = res.data;
        console.log('response:', table);
      });
    };
  }])
  .directive('tableSelector', function() {
    return {
      templateUrl: './partials/tableSelector.html' 
    }
  });
