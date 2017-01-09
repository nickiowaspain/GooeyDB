angular
  .module('HomeController', ['ngRoute', 'rowFactory', 'databaseFactory', 'sortFactory'])
  .controller('HomeController', ['$scope', '$window', 'rowFactory', 'databaseFactory', 'sortFactory','$http', '$sce',HomeController]); 

function checkAddress(potential) {
  if (potential) {
    potential = potential.split(' ');

    //an address needs a street number and name, state and zip code at a bare minimum
    if (potential.length > 3) {
      let streetNumber = parseInt(potential[0], 10);
      let streetName = potential[1];
      let state = potential[potential.length - 2];
      let zip = parseInt(potential[potential.length - 1], 10);

      if (!isNaN(streetNumber) && streetName && state.length === 2 && !isNaN(zip)) {
        return true;
      } else {
        return false;
      }
    }
  }  
}

function HomeController($scope, $window, rowFactory, databaseFactory, sortFactory, $http, $sce) {
  // creates and watches changes rowfactory for changes to the database records and columns
  $scope.rows = rowFactory.rows;
  $scope.columnNames = [];
  $scope.enrichment = [];
 
  $scope.$watch(function () { return rowFactory.rows }, function (oldVal, newVal) {
    if (newVal) {
      Object.keys(rowFactory.rows).forEach(function(row, i){
        let temp = [];
        Object.keys(rowFactory.rows[row]).forEach(function(column, j){
          console.log(column)
          // enrichment functions
        console.log('rowfactory!!!!!', rowFactory.rows[row][column])
        if(rowFactory.rows[row][column].match(/\.(jpg|png|gif)/)) {
          temp.push({
            type:'image',
            resource: rowFactory.rows[row][column]
          });
          
        } else if (rowFactory.rows[row][column].match(/(youtube.com|youtu.be)/g)) {
          let embedLink = rowFactory.rows[row][column].replace(/watch\?v=/, "embed/")
          console.log(embedLink)
          
          temp.push({
            type:'youtube',
            resource: $sce.trustAsResourceUrl(embedLink + "?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com")

          });
        } else if (checkAddress(rowFactory.rows[row][column])) {
          temp.push({
            type:'map',
            resource: 'https://maps.google.com?q=' + rowFactory.rows[row][column]
            //resource: 'https://maps.googleapis.com/maps/api/staticmap?center=' + rowFactory.rows[row][column] + '&zoom=15&scale=false&size=400x200&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C' + rowFactory.rows[row][column]
          });
        } else if (column === 'name') {
          let searchName = rowFactory.rows[i].name;
          temp.push({
            type:'facebook',
            resource: 'https://www.facebook.com/search/people/?q=' + searchName,
            resource1: 'https://www.linkedin.com/vsearch/f?type=all&keywords=' + searchName + '&orig=GLHD&rsid=&pageKey=nprofile_view_nonself&trkInfo=tarId%3A1483993693632&trk=global_header&search=Search'
          })
        } else if(rowFactory.rows[row][column].match(/\.(mp3|wav)/)) {
          temp.push({
          type:'mp3',
          resource: rowFactory.rows[row][column]
          })
         } else if(column === 'github_handle') {
           let tempHandle = rowFactory.rows[i].github_handle;
           console.log('TEMPHANDLE', tempHandle)
           temp.push({
            type:'github',
           resource: 'https://github.com/' + tempHandle})

        } else {
          temp.push({});
        }
      })
      $scope.enrichment.push(temp);
      console.log('this is enrichment!!!!' , $scope.enrichment)
    })
    $scope.rows = rowFactory.rows;
    $scope.columnNames = Object.keys($scope.rows[0]);
      console.log('Rows changed')

    }
    if (oldVal) {
      console.log('No change')
    }
  });
  console.log('enrichment!!!!!', $scope.enrichment)

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