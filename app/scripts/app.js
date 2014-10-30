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

    String.prototype.startsWith = function (str){
      return this.slice(0, str.length) === str;
    };

    String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };

  })
  .service('CurrentPageService', function() {
    this.navIndex = 0;
  });
