'use strict';

storytime_homepage.factory('userAPI', function($http) {
    return {
        signUp: function(user_name) {
                    console.log('signUp username', user_name);
                    // restful API call here;
        },

        signIn: function(user_name) {
                    console.log('signIn username', user_name);
        },
    }
});
