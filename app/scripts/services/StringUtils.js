'use strict';

/**
 * @ngdoc function
 * @name rtbToolsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the rtbToolsApp
 */
angular.module('rtbToolsApp')
  .service('StringUtils', function() {
    function normalize(name) {
      var normalized = name.toLowerCase().trim();
      return normalized;
    }

    function isCategory(name) {
      return name && name.startsWith('==') && name.endsWith('==');
    }

    this.normalize = normalize;
    this.isCategory = isCategory;
  });