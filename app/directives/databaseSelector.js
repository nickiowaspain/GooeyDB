angular
.module('DatabaseSelector', [])
.controller('selectCtrl', function($scope) {
  $scope.dbs = ['database 1', 'database 2', 'database 5', 'orange'];
  $selectedTestAccount = $scope.dbs[1];
  $scope.active = '';
  $scope.load = function() { 
    $scope.active = document.getElementById('drop-down').value.slice(7);
  }
})
.directive('databaseSelector', function() {
  return {
    templateUrl: './partials/databaseSelector.html' 
  }
});