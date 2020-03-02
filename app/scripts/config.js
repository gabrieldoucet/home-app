const _ = require('lodash');
const moment = require("moment");

angular.module('homeApp')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix(''); // by default '!'
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });

    $urlRouterProvider.when('/app/films', '/app/films/all');
    $urlRouterProvider.otherwise('/app/films/all');
    $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
      .state('root', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/root/root.html'
      }).state('root.entertainment', {
        url: '/entertainment',
        templateUrl: 'views/entertainment/entertainment.html',
        controller: 'EntertainmentController',
        controllerAs: 'vm'
      }).state('root.film', {
        url: '/films',
        templateUrl: 'views/film/film.html',
        controller: 'FilmController',
        controllerAs: 'vm',
        abstract: true,
        resolve: {
          films: function (dataService) {
            return dataService.getFilms();
          },
          summaries: function (dataService) {
            return dataService.getSummaries();
          }
        }
      }).state('root.film.unlimited', {
        url: '/unlimited',
        templateUrl: 'views/film/film.unlimited.html',
        controller: 'FilmAllController',
        controllerAs: 'vm'
      }).state('root.film.all', {
        url: '/all',
        templateUrl: 'views/film/film.all.html',
        controller: 'FilmAllController',
        controllerAs: 'vm'
      }).state('root.kitchen', {
        url: '/kitchen',
        templateUrl: 'views/kitchen/kitchen.html',
        controller: 'KitchenController',
        controllerAs: 'vm'
      }).state('root.library', {
        url: '/library',
        template: '<div ui-view></div>',
        controller: 'LibraryController',
        controllerAs: 'vm',
        resolve: {
          scores: function (dataService) {
            return dataService.getScores();
          }
        }
      }).state('root.library.scores', {
        url: '/scores',
        templateUrl: 'views/library/scores/scores.html',
        controller: 'ScoresController',
        controllerAs: 'vm',
        resolve: {
          scores: function (dataService) {
            return dataService.getScores();
          }
        }
      }).state('root.pharmacy', {
        url: '/pharmacy',
        templateUrl: 'views/pharmacy/pharmacy.html',
        controller: 'PharmacyController',
        controllerAs: 'vm'
      });
  }])
  .filter('isoDateToHuman', isoDateToHuman)
  .filter('unlimited', unlimited);

function isoDateToHuman () {
  return function (date) {
    return moment(date).format('ddd Do MMMM YYYY');
  }
};

function unlimited () {
  return function (films) {
    const unlimitedFilms = _.filter(films, { unlimited: true });
    return unlimitedFilms;
  }
};
