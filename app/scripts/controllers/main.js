'use strict';

/**
 * @ngdoc function
 * @name rtbToolsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rtbToolsApp
 */
angular.module('rtbToolsApp')
  .controller('MainCtrl', function ($scope, CurrentPageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    CurrentPageService.navIndex = 0;
  });
