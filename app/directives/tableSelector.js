angular.module('TableSelector', ['databaseFactory'])
  .controller('tableSelector', ['$scope', '$http', 'databaseFactory', function($scope, $http, databaseFactory) {
    
    $scope.$watch(function() {return databaseFactory.dbName}, function() {

      if (databaseFactory.dbName) {
        // create database url string from databaseFactory being updated
        var url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' +databaseFactory.dbName;

        var data = {
          url : url
        }
        
        $http.post('/getTables', data).then(function(res) {
          var tables = res.data;
          console.log('response:', tables);
        });
      }
    })

    // example tableObj
    $scope.tableObj = {
      students : 'students',
      tutors : 'tutors'
    };

    // GET request for table triggered by click
    $scope.getTable = function(tName) {
      // watch for change in databaseFactory to update list of tables in selected database

      // get database url
      $scope.url = 'postgres://aeqxadhz:qHz6IxCJsV2GXmiQRzEPTU_wj4WufZQh@elmer.db.elephantsql.com:5432/aeqxadhz';
      
      // get the name of the table that was clicked on
      $scope.tableName = tName;

      // put database url and tablename into an object for the POST request
      var data = {
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
