angular.module('TableSelector', ['databaseFactory', 'rowFactory'])
  .controller('tableSelector', ['$scope', '$http', 'databaseFactory', 'rowFactory', function($scope, $http, databaseFactory, rowFactory) {
    
    // watch for changes in datbaseFactory caused by change in dropdown menu for database selector
    $scope.$watch(function() {return databaseFactory.dbName}, function() {
      // only load tables if a database is selected
      if (databaseFactory.url) {
        // create database url string from databaseFactory being updated
        var url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;

        // create data for request body
        var data = {
          dbName: databaseFactory.dbName, 
          url : url
        }
        
        $http.post('/getTables', data).then(function(res) {
          var tables = res.data;
          var cleanedTables = {};
          for (var i = 0; i < tables.length; i += 1) {
            var prop = tables[i].slice(7);
            cleanedTables[prop] = prop;
          }
          // console.log('response:', cleanedTables);

          // update tableObj with table names
          $scope.tableObj = cleanedTables;
        });
      }
    });

    // example tableObj
    $scope.tableObj = {
    };

    // GET request for table triggered by click
    $scope.getTable = function(tName) {
      // watch for change in databaseFactory to update list of tables in selected database

      // get database url
      // $scope.url = 'postgres://aeqxadhz:qHz6IxCJsV2GXmiQRzEPTU_wj4WufZQh@elmer.db.elephantsql.com:5432/aeqxadhz';
      
      var url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;

      // get the name of the table that was clicked on
      $scope.tableName = tName;

      // put database url and tablename into an object for the POST request
      var data = {
        url: url,
        tableName: $scope.tableName
      };

      $http.post('/getTable', data).then(function(res) {
        var table = res.data;
        // console.log('response:', table);
        console.log('before rowFactory', rowFactory.rows);
        rowFactory.rows = table;
        console.log('after rowFactory', rowFactory.rows);
        rowFactory.tableName = data.tableName;
      });
    };
  }])
  .directive('tableSelector', function() {
    return {
      templateUrl: './partials/tableSelector.html' 
    }
  });
