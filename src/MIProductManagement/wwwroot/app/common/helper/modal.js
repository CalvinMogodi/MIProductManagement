(function () {
    'use strict';    

    function modal($mdDialog, $mdMedia) {  

        var hide = function () {
            $mdDialog.hide();
        };
        var cancel = function () {
            $mdDialog.cancel();
        };

        var getResult = function (result) {
            $mdDialog.hide(result);
        };

        var show = function (templateUrl, modalController) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) ;
           return $mdDialog.show({
                controller: modalController,
                templateUrl: templateUrl,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: useFullScreen
           });
          
        }

        return {
            show: show,
            cancel: cancel,
            hide: hide,
            getResult: getResult,
        };
    }

    angular.module('MIPM').factory('modal', modal);
    modal.$inject = ['$mdDialog', '$mdMedia'];

})();