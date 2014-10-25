'use strict';

/**
 * @ngdoc overview
 * @name rtbToolsApp
 * @description
 * # rtbToolsApp
 *
 * Main module of the application.
 */
angular
  .module('rtbToolsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/uniques', {
        templateUrl: 'views/uniques.html',
        controller: 'UniquesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('CurrentPageService', function() {
    this.navIndex = 0;
  });
