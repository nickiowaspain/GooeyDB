//this directive been commented out of the index page. once you uncomment it you will see what it should ideally do. 

angular
  .module('TableActions', [])
  .directive('tableActions', function() {
    return {
      templateUrl: './partials/tableActions.html' 
    }
  });
