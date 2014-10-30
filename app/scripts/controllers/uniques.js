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

    function isCategory(name) {
      return name && name.startsWith('==') && name.endsWith('==');
    }

    $scope.update = function() {
      var i, name, lastCategory;
      var uniquesList = $scope.uniquesModel.trim().split('\n');
      $scope.total = 0;

      var uniqueCounts = {};

      for(i = 0; i < uniquesList.length; i++) {
        name = uniquesList[i];
        name = name.trim();

        if(!name || !name.length) {
          continue;
        }

        if(isCategory(name)) {
          lastCategory = name.replace(new RegExp('^=='), '').replace(new RegExp('==$'), '');
          continue;
        }

        name = normalize(name);

        var obj = uniqueCounts[name];
        if(!obj) {
          obj = uniqueCounts[name] = {
            count: 0,
            categories: []
          };
        }

        obj.count++;
        if(lastCategory) {
          obj.categories.push(lastCategory);
        }

        $scope.total++;
      }

      var uniqueKeys = Object.keys(uniqueCounts);
      $scope.uniques = [];
      $scope.duplicates = [];
      $scope.totalUniques = uniqueKeys.length;

      for(i = 0; i < uniqueKeys.length; i++) {
        name = uniqueKeys[i];
        if(uniqueCounts[name].count > 1) {
          $scope.duplicates.push(name);
        }

        var uniquesObj = uniqueCounts[name];

        var item = name + ' (' + uniquesObj.count + ')';
        if(uniquesObj.categories && uniquesObj.categories.length) {
          item += ' (' + uniquesObj.categories.join(', ') + ')';
        }

        $scope.uniques.push(item);
      }

      $scope.duplicates.sort(function(a, b){
        return a > b;
      });

      $scope.uniques.sort(function(a, b){
        return a > b;
      });
    };
  });
