(function () {
    'use strict';

    function BlockMakerController($location, $firebaseArray, firebaseUrl, $scope, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.heading = "Block Maker";
        vm.icon = "business";

        vm.gridOptions = {
            columnDefs: [
              { field: 'productDescription', displayName: 'Product Description'},
              { field: 'total', displayName: 'Total'},
              { field: 'used', displayName: 'Used'},
              { field: 'createdDate', displayName: 'Date Created'},
            {
                field: 'Actions', displayName: 'Actions', cellTemplate:
                    '<md-button class="md-icon-button" ng-click="grid.appScope.vm.editRecord(row.entity)"><md-icon md-font-icon="material-icons" class="md-font material-icons">edit</md-icon></md-button>' +
                    '<md-button class="md-icon-button" ng-click="grid.appScope.vm.deleteRecord(row.entity)"><md-icon md-font-icon="material-icons" class="md-font material-icons">delete</md-icon></md-button>' 
                }
            ],
            exporterSuppressColumns: ['Actions'],
            enableColumnMenus: false,
            rowHeight: 35,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            exporterCsvColumnSeparator: ';',
            enableGridMenu: true,
            enableSelectAll: false,
            enableSorting: true,
            exporterCsvFilename: 'Block Maker Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Block Maker Report", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

       
        init();
        function init() {
            vm.blockMakers = $firebaseArray(ref.child('BlockMaker'));
            vm.blockMakers.$loaded(function (data) {
                vm.gridOptions.data = data;
                ProductCategoryService.loadProducts('blockMaker');
                vm.products = ProductCategoryService.products;
            })
        }

        vm.newRecord = function () {           
            ProductCategoryService.assignCurrentRecord(undefined);
            var templateUrl = '/app/components/productCategory/blockMaker/addEditBlockMaker/addEditBlockMaker.html';
            modal.show(templateUrl, 'AddEditBlockMakerController').then(function () {
            });
        }

        vm.deleteRecord = function (row) {
            vm.blockMakers.$remove(row);
        }
        vm.editRecord = function (row) {
            ProductCategoryService.assignCurrentRecord(row);
            var templateUrl = '/app/components/productCategory/blockMaker/addEditBlockMaker/addEditBlockMaker.html';
            modal.show(templateUrl, 'AddEditBlockMakerController').then(function () {
            });
        }
        vm.filter = function (filter) {
            var list = angular.copy(vm.blockMakers);
            var results = [];
            if (filter.productDescription) {
                for (var i = 0; i < list.length; i++) {
                    if (filter.productDescription.toLowerCase() == list[i].productDescription.toLowerCase()) {
                        results.push(list[i]);
                    }
                }
            }
            if (filter.fromDate && filter.toDate) {
                for (var i = 0; i < list.length; i++) {
                    var createdDate = new Date(list[i].createdDate);
                    if (filter.fromDate <= createdDate && filter.toDate >= createdDate) {
                        var addItem = true;
                        for (var j = 0; j < results.length; j++) {
                            if (list[i].$id == results[j].$id) {
                                addItem = false;
                                break;
                            }
                        }
                        if (addItem) {
                            results.push(list[i]);
                        }
                    }
                    }
            }
            vm.gridOptions.data = results;
        }
        vm.clear = function () {
            vm.filter.productDescription = undefined;
            vm.filter.toDate = undefined;
            vm.filter.fromDate = undefined;
        }
        
    }

    angular.module('MIPM').controller('BlockMakerController', BlockMakerController);
    BlockMakerController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', '$scope', 'ProductCategoryService', 'modal'];

})();
