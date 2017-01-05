angular
  .module('HomeController', ['ngRoute'])
  .controller('HomeController', HomeController);

function HomeController($scope, $http) {
  $scope.dbSettings = {
    username: 'aeqxadhz',
    password: 'qHz6IxCJsV2GXmiQRzEPTU_wj4WufZQh',
    url: 'elmer.db.elephantsql.com',
    dbname: 'aeqxadhz'
  };
  $scope.serverConnect = function() {
    $http({
      url: 'http://localhost:3000/getTables',
      method: 'POST',
      data: $scope.dbSettings,
    }).then(function (httpResponse) {
      console.log('HELLOOOOO', httpResponse)
    }).catch(function(err) {
      console.log('NOOOOOOOOOOOO!');
    });
  }
}
