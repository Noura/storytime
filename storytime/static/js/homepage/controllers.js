'use strict';

storytime_homepage.controller('UserCtrl', function($scope, userAPI) {
    $scope.signIn = function() {
        console.log('UserCtrl.signIn username', $scope.userName);
    };
});
