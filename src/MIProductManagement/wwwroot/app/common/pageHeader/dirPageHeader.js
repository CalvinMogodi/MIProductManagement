/// <reference path="page.header.template.html" />
(function () {
    'use strict';

    function dirPageHeader($window, $sessionStorage, $location) {

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'app/common/pageheader/page.header.template.html',
            scope: {
                heading: '=',
                icon: '=',
                addNewButtonFunction: '&',
                showNewButton: '=',
                showSearch: '=',
                searchFunction: '&',
                removeFunction: '&',
                tabs: '=',
                tabClickedFunction: '&',
                SomeFunction: '&',
                time: '='
            }

        };
        return directive;
        function link(scope, element, attrs) {
            scope.searchTags = [];

            window.setInterval(function () {
                scope.currentTime = new Date()
            }, 1000);


            scope.remove = function (item) {

                var str = "";
                item = str;
                scope.search(str);
            }

            scope.search = function (item) {
                scope.searchFunction()(item);
            }

            scope.openToolsMenu = function ($mdOpenMenu, ev) {

                $mdOpenMenu(ev);
            };

            scope.logout = function () {
                $sessionStorage.$reset();
                delete $sessionStorage.applicationUser;
                $sessionStorage.isPermissionLoaded = false;
                $location.path('/login');
            }

            scope.menu = function () {
                scope.$emit('go');
            }

            scope.tabClicked = function (tab) {
                scope.tabClickedFunction()(tab);
            }
        }
    }


    angular.module('MIPM').directive('dirPageHeader', dirPageHeader);
    dirPageHeader.$inject = ['$window', '$sessionStorage', '$location'];

})();