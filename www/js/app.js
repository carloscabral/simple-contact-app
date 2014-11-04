// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('people', {
    url: '/people',
    controller: 'PeopleCtrl',
    templateUrl: 'templates/people.html'
  });
  $urlRouterProvider.otherwise('/people');

})

.controller('PeopleCtrl', function($scope, people){
  $scope.people = people.list;

})

.factory('people', function($http, $q){
  var people = {};
  var n = 0;

  people.list = [];

  people.add = function(){
    return $http.get('http://api.randomuser.me?q=' + (n++))
    .then(function(response){
      people.list.push(response.data.results[0].user);
    });
  };

  people.read = $q.all([
    people.add(),
    people.add(),
    people.add()
  ]);

  return people;
});


