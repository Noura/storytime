'use strict';

storytime.controller('PageCtrl', function($scope, storyAPI) {
    $scope.page = storyAPI.getPage(1);

    $scope.pageTurn = function(dir) {
        $scope.set_direction(dir);
        if (dir === 'forward' && $scope.at_page_end()) {
            if ($scope.page.page < $scope.page.pages) {
                $scope.page = storyAPI.getPage($scope.page.page + 1);
            } else {
                return; //TODO do not show back arrow if at page 0
            }
        } else if (dir === 'backward' && $scope.at_page_beginning()) {
            if ($scope.page.page > 1) {
                $scope.page = storyAPI.getPage($scope.page.page - 1);
            } else {
                return; //TODO do not show forward arrow if at last page
            }
        } else { // just show forward or back on the current page
            // flag that myTextFit watches
            $scope.page_turn_dir = dir;
        }
    };
});
