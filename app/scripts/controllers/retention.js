'use strict';

/**
 * @ngdoc function
 * @name rtbToolsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rtbToolsApp
 */
angular.module('rtbToolsApp')
  .controller('RetentionCtrl', function ($scope, CurrentPageService, StringUtils) {

    CurrentPageService.navIndex = 1;
    $scope.retentionModel = '== Category 1 ==\n' +
      'Name 1\n' +
      'Name 2\n' +
      '\n' +
      '== Category 2 ==\n' +
      'Name 1\n' +
      'Name 3\n';

    $scope.result = {};

    $scope.update = function() {
      var categories = parseInput();
      $scope.result.categories = categories;
      deriveResults();
    };

    function parseInput() {
      var i, name, lastCategory;
      var lines = $scope.retentionModel.trim().split('\n');

      var categories = {};

      for(i = 0; i < lines.length; i++) {
        name = lines[i];
        name = name.trim();

        if(!name || !name.length) {
          continue;
        }

        if(StringUtils.isCategory(name)) {
          lastCategory = name.replace(new RegExp('^=='), '').replace(new RegExp('==$'), '').trim();
          categories[lastCategory] = {
            name: lastCategory,
            members: []
          };

          continue;
        }

        if(i === 0) {
          // First line has gotta be a category
          continue;
        }

        name = StringUtils.normalize(name);

        var category = categories[lastCategory];
        category.members.push(name);
      }

      var categoryList = [];
      for(var key in categories) {
        categoryList.push(categories[key]);
      }

      return categoryList;
    }

    function deriveResults() {
      var i,j;

      var totalMembers = 0,
          conversions = {};

      var numCategories = $scope.result.categories.length;

      for(i = 0; i < numCategories; i++) {
        var category = $scope.result.categories[i];
        totalMembers += category.members.length;

        console.log('category', category);
        for(j = 0; j < category.members.length; j++) {
          var member = category.members[j];
          var conversion = conversions[member];

          if((!conversion && i === 0) || conversion && conversion.length === i) {
            if(!conversion) {
              conversion = conversions[member] = [];
            }

            console.log('conversion', category.name, member);
            conversion.push(category.name);
          }
        }
      }

      var conversionsByStep = [];
      var conversionMembers = Object.keys(conversions);
      console.log('conversions', conversions);
      for(i = 0; i < numCategories; i++) {
        var category = $scope.result.categories[i];
        var step = conversionsByStep[i];
        if(!step) {
          step = conversionsByStep[i] = {
            name: category.name,
            count: 0,
            totalRate: 0,
            previousRate: 0
          };
        }

        for(j = 0; j < conversionMembers.length; j++) {
          var conversionMember = conversionMembers[j];
          var stepList = conversions[conversionMember];
          console.log('steps', stepList);
          if(stepList.length > i) {
            conversionsByStep[i].count++;
          }
        }

        if(i > 0 && step) {
          var firstStep = conversionsByStep[0];
          var previousStep = conversionsByStep[i-1];

          step.totalRate = step.count / firstStep.count;
          step.previousRate = step.count / previousStep.count;
        }
      }

      $scope.result.conversionsByStep = conversionsByStep;
    }

    $scope.update();
  });