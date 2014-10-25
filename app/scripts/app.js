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
      .when('/tool1', {
        templateUrl: 'views/tool1.html',
        controller: 'Tool1Ctrl'
      })
      .when('/tool2', {
        templateUrl: 'views/tool2.html',
        controller: 'Tool2Ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
