 angular
  .module('sortFactory', [])
  .factory('sortFactory', sortFactory); 

function sortFactory() {
  return {
    colName: '',
    sort: '',
    search: ''
  }
}