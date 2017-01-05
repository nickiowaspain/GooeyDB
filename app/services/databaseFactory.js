 angular
  .module('databaseFactory', [])
  .factory('databaseFactory', dataBaseFactory); 

function dataBaseFactory() {
	return {
		dbName: '',
    user: '',
    password: '',
    url: ''
	}
}