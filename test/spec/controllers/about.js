'use strict';

describe('Controller: Tool1Ctrl', function () {

  // load the controller's module
  beforeEach(module('rtbToolsApp'));

  var Tool1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Tool1Ctrl = $controller('Tool1Ctrl', {
      $scope: scope
    });
  }));
});
