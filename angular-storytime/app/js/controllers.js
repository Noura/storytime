'use strict';

storytime.controller('PageCtrl', function($scope, storyAPI) {
  $scope.page = storyAPI.getPage(1);
});
