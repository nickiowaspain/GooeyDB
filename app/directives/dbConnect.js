angular
  .module('DbConnect', ['ngCookies', 'databaseFactory'])
  .controller('dbConnectController', ['$scope', '$http', '$cookies', 'databaseFactory', function ($scope, $http, $cookies, databaseFactory) {
    $scope.data = {
      username: 'aeqxadhz',
      password: 'qHz6IxCJsV2GXmiQRzEPTU_wj4WufZQh',
      url: 'elmer.db.elephantsql.com',
      dbname: 'aeqxadhz'
    };

    $scope.serverConnect = function (username, password, url, dbname) {
      $scope.data.username = username;
      $scope.data.password = password;
      $scope.data.url = url;
      $scope.data.dbname = dbname;
      databaseFactory.dbName = dbname;
      $cookies.put('gooey:' + $scope.data.dbname, '%' + $scope.data.username + '%' + $scope.data.password + '%' + $scope.data.url + '%' + $scope.data.dbname);
      
      $http({
          url: 'http://localhost:3000/connect',
          method: 'POST',
          data: $scope.data
      }).then(function (httpResponse) {
          console.log(httpResponse)
      })
      console.log($scope.data);
    }

  }])
  .directive('dbConnect', function () {
    return {
      templateUrl: './partials/dbConnect.html' 
    }
  });

