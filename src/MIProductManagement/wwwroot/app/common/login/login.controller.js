(function () {
    'use strict';

    function LoginController($location, $scope, $firebaseObject, $firebaseArray, $sessionStorage, $rootScope, LoginService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        var ref = new Firebase("https://eoh-intranet.firebaseio.com");
        vm.login = {};

        $rootScope.profileImage = 'assets/img/placeholder.png';

        $scope.login = function (credentials) {
            ref.authWithPassword({
                email: credentials.username,
                password: credentials.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $scope.$apply(function () {
                        console.log("Authenticated successfully with payload:", authData);
                        $sessionStorage.isUserAuthenticated = true;
                        $sessionStorage.displayName = 'Administrator';
                        $sessionStorage.profileImage = '';
                        $sessionStorage.idNumber = '123456789';
                        $sessionStorage.userType = 'admin';
                        LoginService.setLoginDetails();
                        $location.path('/dashboard');
                    });
                }
            });
        }


        $scope.loginWithFacebook = function (credentials) {
            ref.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    $scope.$apply(function () {
                    console.log("Authenticated successfully with payload:", authData);
                    $sessionStorage.isUserAuthenticated = true;
                    $sessionStorage.userType = 'employee';
                    $sessionStorage.displayName = authData.google.displayName;
                    $sessionStorage.profileImage = authData.google.profileImageURL;
                    LoginService.setLoginDetails();
                    $location.path('/dashboard');
                   });
                }
            });
        }

        //$scope.loginWithFacebook = function (credentials) {
        //    ref.authWithOAuthPopup("facebook", function (error, authData) {
        //        if (error) {
        //            console.log("Login Failed!", error);
        //        } else {

        //            $scope.$apply(function () {
        //                console.log("Authenticated successfully with payload:", authData);
        //                $sessionStorage.isUserAuthenticated = true;
        //                $sessionStorage.userType = 'employee';
        //                $sessionStorage.displayName = authData.facebook.displayName;
        //                $sessionStorage.profileImage = authData.facebook.profileImageURL;
        //                $sessionStorage.idNumber = authData.facebook.cachedUserProfile.id;
        //                LoginService.setLoginDetails();
        //                $location.path('/dashboard');
        //            });

        //        }

        //    });
        //}

    }

    angular.module('MIPM').controller('LoginController', LoginController);
    LoginController.$inject = ['$location', '$scope', '$firebaseObject', '$firebaseArray', '$sessionStorage', '$rootScope', 'LoginService'];
})();
