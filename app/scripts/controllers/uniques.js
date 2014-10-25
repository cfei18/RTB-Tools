'use strict';

/**
 * @ngdoc function
 * @name rtbToolsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rtbToolsApp
 */
angular.module('rtbToolsApp')
  .controller('UniquesCtrl', function ($scope, CurrentPageService) {

    CurrentPageService.navIndex = 0;

    $scope.uniquesModel = '';
    $scope.total = 0;
    $scope.totalUniques = 0;

    function normalize(name) {
      var normalized = name.toLowerCase().trim();
      return normalized;
    }

    $scope.update = function() {
      var uniquesList = $scope.uniquesModel.trim().split('\n');
      $scope.total = uniquesList.length;

      var uniqueCounts = {};
      for (var i = 0; i < uniquesList.length; i++) {
        var name = uniquesList[i];
        name = normalize(name);

        uniqueCounts[name] = 1 + (uniqueCounts[name] || 0);
      }

      $scope.totalUniques = Object.keys(uniqueCounts).length;
    };
  });
