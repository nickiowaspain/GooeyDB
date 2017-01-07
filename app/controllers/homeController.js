angular
  .module('HomeController', ['ngRoute', 'rowFactory', 'databaseFactory', 'sortFactory'])
  .controller('HomeController', ['$scope', '$window', 'rowFactory', 'databaseFactory', 'sortFactory','$http', HomeController]); 

function HomeController($scope, $window, rowFactory, databaseFactory, sortFactory, $http) {
  // creates and watches changes rowfactory for changes to the database records and columns
  $scope.rows = rowFactory.rows;
  $scope.columnNames = [];
  $scope.enrichment = [];
  $scope.$watch(function () { return rowFactory.rows }, function (oldVal, newVal) {
    if (newVal) {
      console.log('this is rowFactory.rows', rowFactory.rows)
      Object.keys(rowFactory.rows).forEach(function(row, i){
      console.log('this is ROWWWW', rowFactory.rows)
      
         //$scope.enrichment[row] = [];
         let temp = [];
        Object.keys(rowFactory.rows[row]).forEach(function(column, j){
          // enrichment functions
         
          if(rowFactory.rows[row][column].match(/\.(jpg|png|gif)/ )) {
            console.log('mine!!!!' , row, column, true)
            
            temp.push({
          type:'image',
          resource: 'http://img.lum.dolimg.com/v1/images/character_themuppets_pepe_86d94b17.jpeg?region=0,0,300,300'
          })
          //    $scope.enrichment[row][column] = {
          // type:'image',
          // resource: 'http://img.lum.dolimg.com/v1/images/character_themuppets_pepe_86d94b17.jpeg?region=0,0,300,300'
          // };

        }else{
          console.log(false)
          temp.push({});
          // $scope.enrichment[row][column] = {};
        }
        
       
        console.log('this is scope.enrichment' , $scope.enrichment)
        console.log('!' , rowFactory.rows[row][column])
        })
        $scope.enrichment.push(temp);
        //console.log(i,row)
      //console.log(rowFactory.rows[row])
      })

      $scope.rows = rowFactory.rows;
      $scope.columnNames = Object.keys($scope.rows[0]);
      console.log('Rows changed')
    }
    if (oldVal) {
      console.log('No change')
    }
  });

  //creates and watches changes to sortFactory for the search field filter
  $scope.searchTerm = null;
  $scope.$watch(function () { return sortFactory.search }, function (oldVal, newVal) {
    $scope.searchTerm = sortFactory.search;
  });

  //creates column and asc/desc vars and watches changes to sortFactory for the drop down column filter
  $scope.colSortName = null;
  $scope.sortName = null;
  $scope.$watch(function () { return sortFactory.colName }, function (oldVal, newVal) {
    if (sortFactory.sort === 'Descending') {
      console.log('Descending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = true;
    } else {
      console.log('Ascending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = false;
    }
  });

  //watches changes to sortFactory for the drop down asc/desc filter
  $scope.$watch(function () { return sortFactory.sort }, function (oldVal, newVal) {
    if (sortFactory.sort === 'Descending') {
      console.log('Descending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = true;
    } else {
      console.log('Ascending sort');
      $scope.colSortName = sortFactory.colName;
      $scope.sortName = false;
    }
  });

  // create new record functionality
  $scope.newRecord = {
    data: {}
  };
  $scope.addRecord = function() {
    var body = $scope.newRecord;
    body.tableName = rowFactory.tableName;
    body.url = 'postgres://' + databaseFactory.user +':' + databaseFactory.pass + '@' + databaseFactory.url + ':5432/' + databaseFactory.dbName;
    console.log(body);
    $http.post('/addRecord', body).then(function (res) {

    });
  }
  
}