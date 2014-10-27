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

      $scope.uniques = Object.keys(uniqueCounts);
      $scope.duplicates = [];
      $scope.totalUniques = $scope.uniques.length;

      for(i = 0; i < $scope.uniques.length; i++) {
        name = $scope.uniques[i];
        if(uniqueCounts[name] > 1) {
          $scope.duplicates.push(name);
        }
      }

      $scope.duplicates.sort(function(a, b){
        return a > b;
      });

      $scope.uniques.sort(function(a, b){
        return a > b;
      });
    };
  });
