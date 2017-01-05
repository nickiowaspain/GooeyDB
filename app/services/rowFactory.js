 angular
  .module('rowFactory', [])
  .factory('rowFactory', rowFactory); 

function rowFactory() {
  return {
    tableName: '',
    rows: []
  }
}