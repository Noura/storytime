'use strict';

storytime.controller('PageCtrl', function($scope, storyAPI) {
  $scope.page = storyAPI.getPage(1);
  console.log($scope.page);

  $scope.nextPage = function() {
    // flag that myTextFit watches
    $scope.go_to_next_page = true;
  };

  $scope.prevPage = function() {
    // flag that myTextFit watches
    $scope.go_to_prev_page = true;
  };
});
