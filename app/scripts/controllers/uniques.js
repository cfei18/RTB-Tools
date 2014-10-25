'use strict';

/**
 * @ngdoc function
 * @name rtbToolsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rtbToolsApp
 */
angular.module('rtbToolsApp')
  .controller('UniquesCtrl', function ($scope) {

    $scope.uniquesModel = '';
    $scope.total = 0;
    $scope.totalUniques = 0;

    function normalize(name) {
      return name.toLowerCase();
    }

    $scope.update = function() {
      var uniquesList = $scope.uniquesModel.split('\n');
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
