'use strict';

storytime_homepage.factory('userAPI', function($http) {
    function signUp(user_name) {
        console.log('signUp username', user_name);
        return $http.post('/rest/users/new', {userName: user_name});
    }
    function signIn(user_name) {
        console.log('signIn username', user_name);
        return $http.post('/rest/users/login', {'userName': user_name});
    }
    return {
        signUp: signUp,
        signIn: signIn,
    }
});
