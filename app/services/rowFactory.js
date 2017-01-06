 angular
  .module('rowFactory', [])
  .factory('rowFactory', rowFactory); 

function rowFactory() {
  return {
    tableName: 'Table',
    rows: []
  }
}