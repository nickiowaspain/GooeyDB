 angular
  .module('recordFactory', [])
  .factory('recordFactory', recordFactory); 

function recordFactory() {
  return {
    record: []
  }
}