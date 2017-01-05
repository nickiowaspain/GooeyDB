angular
  .module('ActionBar', [])
  .controller('ActionBar', ['$scope', function ($scope) {
    $scope.columns = {
      columns: [
        {id: 1, name: 'Mirpur', dId: 1},
        {id: 2, name: 'Uttra', dId: 1},
        {id: 3, name: 'Shahabag', dId: 1},
        {id: 4, name: 'Kotalipara', dId: 2},
        {id: 5, name: 'Kashiani', dId: 2},
        {id: 6, name: 'Moksedpur', dId: 2},
        {id: 7, name: 'Vanga', dId: 3},
        {id: 8, name: 'faridpur', dId: 3}
      ]
    };
  }])
  .directive('actionBar', function() {
    return {
      templateUrl: './partials/actionBar.html' 
    }
  });
