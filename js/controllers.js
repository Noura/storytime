'use strict';

storytime.controller('PageCtrl', function($scope, storyAPI) {
    $scope.page = storyAPI.getPage(0);

    $scope.pageTurn = function(dir) {
        // flag that myTextFit watches
        $scope.page_turn_dir = dir;
    };
});
