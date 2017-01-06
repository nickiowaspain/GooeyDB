angular
  .module('DbConnect', ['ngCookies', 'databaseFactory'])
  .controller('dbConnectController', ['$scope', '$http', '$cookies', 'databaseFactory', function ($scope, $http, $cookies, databaseFactory) {
    //initial variables for connection credentials
    $scope.data = {
      username: '',
      password: '',
      url: '',
      dbname: ''
    };

    //input function for creating a new connection and saving the credentials to a cookie. 'gooey' is our cookie identifier
    $scope.serverConnect = function (username, password, url, dbname) {
      $scope.data.username = username;
      $scope.data.password = password;
      $scope.data.url = url;
      $scope.data.dbname = dbname;
      databaseFactory.dbName = dbname;
      $cookies.put('gooey:' + $scope.data.dbname, '%' + $scope.data.username + '%' + $scope.data.password + '%' + $scope.data.url + '%' + $scope.data.dbname);
      
      //uses entered credentials to make connection to database
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

