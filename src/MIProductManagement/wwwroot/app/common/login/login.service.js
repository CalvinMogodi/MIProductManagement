(function () {
    'use strict';



    function LoginService($http, $q, $sessionStorage, $rootScope) {
        var self = this;
        self.currentRecruitment = {};

        this.setLoginDetails = function () {
            $rootScope.displayName = $sessionStorage.displayName;
            $rootScope.profileImage = $sessionStorage.profileImage;
            $rootScope.idNumber = $sessionStorage.idNumber;
            $rootScope.userType = $sessionStorage.userType;
        }


    }

    angular.module('MIPM').service('LoginService', LoginService);
    LoginService.$inject = ['$http', '$q', '$sessionStorage', '$rootScope'];
})();
