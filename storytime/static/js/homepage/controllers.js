'use strict';

storytime_homepage.controller('UserCtrl', function($scope, userAPI) {

    $scope.signIn = function() {
        console.log('UserCtrl.signIn username', $scope.userName);
        var response = userAPI.signIn($scope.userName).then(function(d) {
            console.log('UserCtrl.signIn got response', d);
        });
    };

    $scope.signUp = function() {
        console.log('UserCtrl.signUp username', $scope.userName);
        var response = userAPI.signUp($scope.userName).then(function(d) {
            console.log('UserCtrl.signUp got response', d);
        });
    };
});
