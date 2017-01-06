angular.module('TableSelector', ['databaseFactory', 'rowFactory'])
  .controller('tableSelector', ['$scope', '$http', 'databaseFactory', 'rowFactory', function($scope, $http, databaseFactory, rowFactory) {
    
    // watch for changes in databaseFactory caused by change in dropdown menu for database selector
    $scope.$watch(function() {return databaseFactory.dbName}, function(newVal, oldVal) {
      // only load tables if a database is selected
      if (databaseFactory.url) {
        // create database url string from databaseFactory being updated
        var url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;

        // create data for request body
        var data = {
          dbName: databaseFactory.dbName, 
          url : url
        }
        
        // send post request to server, request body includes the database url and database name
        $http.post('/getTables', data).then(function(res) {

          // on success, clean up the table names received from server
          var tables = res.data;
          console.log('response:', tables);
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

    // two way data binding allows the partial to dynaically display table names for selected database
    $scope.tableObj = {};

    $scope.getTable = function(tName) {
      // create database url string from databaseFactory 
      var url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;

      // get the name of the table that was clicked on
      $scope.tableName = tName;

      // put database url and tablename into an object for the POST request
      var data = {
        url: $scope.url,
        url: url,
        tableName: $scope.tableName
      };

      // send post request to server, request body includes the database url and table name
      $http.post('/getTable', data).then(function(res) {
        // table is an array of objects, each object is a record/row in the table, keys being col names and values being values
        var table = res.data;
        // console.log('response:', table);
        // console.log('before rowFactory', rowFactory.rows);
        // update row factory to have rows/records for selected table
        rowFactory.rows = table;
        // console.log('after rowFactory', rowFactory.rows);
        rowFactory.tableName = data.tableName;
      });
    };
  }])
  .directive('tableSelector', function() {
    return {
      templateUrl: './partials/tableSelector.html' 
    }
  });
