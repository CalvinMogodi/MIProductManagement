(function () {
    'use strict';   

    function indexController($location, $scope, $firebaseObject, $firebaseArray, $rootScope, $sessionStorage, LoginService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexController';
        var ref = new Firebase("https://eoh-intranet.firebaseio.com/Users");
        vm.Users = $firebaseArray(ref);

        // vm.Users.$add({ name: 'Denzil' });

        LoginService.setLoginDetails();

        if ($sessionStorage.isUserAuthenticated) {
            vm.userAuthenticated = true;

        }
        else {
            vm.userAuthenticated = false;
            $location.path('/login');
        }


        $scope.navigateTo = function (url) {
            $location.path(url);
        }
    }

    angular.module('MIPM').controller('indexController', indexController);
    indexController.$inject = ['$location', '$scope', '$firebaseObject', '$firebaseArray', '$rootScope', '$sessionStorage', 'LoginService'];
})();
