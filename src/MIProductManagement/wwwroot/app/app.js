(function () {
    'use strict';

    var app = angular.module('MIPM', ['ngRoute', 'toastr', 'firebase', 'ngStorage', 'angular-jwt', 'ngMaterial', 'ngMenuSidenav', 'ngMessages', 'md.data.table', 'angularMoment', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);
    app.constant('firebaseUrl', 'https://flickering-torch-5362.firebaseio.com');

    app.run(function ($rootScope, $location, $sessionStorage, $timeout) {
        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.currentUrl = $location.path();
        });
    });

})();