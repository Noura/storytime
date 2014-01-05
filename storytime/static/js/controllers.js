'use strict';

storytime.controller('UserCtrl', function($scope, userAPI) {
    console.log('UserCtrl $scope', $scope);
    $scope.signIn = function() {
        console.log('UserCtrl.signIn username', $scope.userName);
        var response = userAPI.signIn($scope.userName).then(function(d) {
            console.log('UserCtrl.signIn got response', d);
            window.location.pathname = '/user_home';
        });
    };

    $scope.signUp = function() {
        console.log('UserCtrl.signUp username', $scope.userName);
        var response = userAPI.signUp($scope.userName).then(function(d) {
            console.log('UserCtrl.signUp got response', d);
        });
    };
});

storytime.controller('PageCtrl', function($scope, storyAPI) {
    console.log('PageCtrl $scope', $scope);
    /*
    $scope.page = storyAPI.getPage(1).then(function(d) {
        $scope.page = d;
        console.log('$scope.page', $scope.page);
    });*/
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

storytime.controller('NewStoryCtrl', function($scope) {
    console.log('NewStoryCtrl $scope', $scope);
    $scope.goToNewStoryPage = function() {
        window.alert("TODO: make a new story page and go there");
    };
});

storytime.controller('OldStoriesCtrl', function($scope) {
    console.log('OldStoriesCtrl $scope', $scope);
    // TODO get this from the server
    $scope.stories = [
        { url: 'blahblahblah', thumbnail: 'http://digital.library.upenn.edu/women/williams/rabbit/spring.jpeg' },
        { url: 'blahblah2', thumbnail: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2009/1/10/1231580586710/Winnie-the-Pooh-001.jpg' }
    ];
});
