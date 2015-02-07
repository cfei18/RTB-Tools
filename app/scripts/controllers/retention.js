'use strict';

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
      var uniquesList = $scope.retentionModel.trim().split('\n');

      var categories = {};

      for(i = 0; i < uniquesList.length; i++) {
        name = uniquesList[i];
        name = name.trim();

        if(!name || !name.length) {
          continue;
        }

        if(StringUtils.isCategory(name)) {
          lastCategory = name.replace(new RegExp('^=='), '').replace(new RegExp('==$'), '');
          categories[lastCategory] = {
            name: lastCategory,
            members: []
          };

          continue;
        }

        if(i === 0) {
          // First line has gotta be a category
          return;
        }

        name = StringUtils.normalize(name);

        var category = categories[lastCategory];
        category.members.push(name);

        return categories;
      }
    }

    function deriveResults() {
      var i,j;

      var totalMembers = 0,
          conversions = {};

      var numCategories = $scope.result.categories.length;

      for(i = 0; i < numCategories; i++) {
        var category = $scope.result.categories[i];
        totalMembers += category.members.length;

        for(j = 0; j < category.members.length; j++) {
          var member = category.members[j];
          var conversion = conversions[member];
          if(!conversion) {
            conversion = conversions[member] = [];
          }

          if(conversion.length === j) {
            conversion.push(category.name);
          }
        }
      }

      var conversionsByStep = [];
      var conversionMembers = Object.keys(conversions);
      for(i = 0; i < numCategories; i++) {
        for(j = 0; j < conversionMembers.length; j++) {
          var stepList = conversions[j];
          if(stepList >= i) {
            var numConversionsForStep = conversionsByStep[i];
            if(!numConversionsForStep) {
              conversionsByStep[i] = 0;
            }

            conversionsByStep[i]++;
          }
        }
      }

      $scope.result.conversionsByStep = conversionsByStep;
    }
  });