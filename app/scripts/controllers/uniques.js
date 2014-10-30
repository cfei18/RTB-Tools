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
    $scope.duplicates = [];
    $scope.uniques = [];

    function normalize(name) {
      var normalized = name.toLowerCase().trim();
      return normalized;
    }

    $scope.update = function() {
      var i, name;
      var uniquesList = $scope.uniquesModel.trim().split('\n');
      $scope.total = uniquesList.length;

      var uniqueCounts = {};
      for(i = 0; i < uniquesList.length; i++) {
        name = uniquesList[i];
        name = normalize(name);

        uniqueCounts[name] = 1 + (uniqueCounts[name] || 0);
      }

      var uniqueKeys = Object.keys(uniqueCounts);
      $scope.uniques = [];
      $scope.duplicates = [];
      $scope.totalUniques = uniqueKeys.length;

      for(i = 0; i < uniqueKeys.length; i++) {
        name = uniqueKeys[i];
        if(uniqueCounts[name] > 1) {
          $scope.duplicates.push(name);
        }

        $scope.uniques.push(name + ' (' + uniqueCounts[name] + ')');
      }

      $scope.duplicates.sort(function(a, b){
        return a > b;
      });

      $scope.uniques.sort(function(a, b){
        return a > b;
      });
    };
  });
