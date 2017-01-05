var app = angular
.module('myApp', [
  'ngRoute',
  'HomeController',
  'DbConnect',
  'DatabaseSelector',
  'Breadcrumbs',
  'ActionBar',
  'TableActions',
  'TableSelector'
]);

app.config(configFunction);

function configFunction($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl: './partials/home.html',
    controller: 'HomeController'
  })

};