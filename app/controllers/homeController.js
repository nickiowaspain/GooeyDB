angular
  .module('HomeController', ['ngRoute'])
  .controller('HomeController', HomeController);


function HomeController($scope) {
  $scope.name = 'Jimmy';
}
