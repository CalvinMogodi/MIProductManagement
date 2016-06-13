﻿(function () {
    'use strict';

    function BlockMakerController($location, $firebaseArray, firebaseUrl, $scope, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);     

        $scope.gridOptions = {
            columnDefs: [
              { field: 'productDesricption', displayName: 'Product Desricption' },
              { field: 'total', displayName: 'Total'},
              { field: 'used', displayName: 'Used'},
              { field: 'createdDate', displayName: 'Date Created'},
            {
                field: ' ', displayName: 'Actions', cellTemplate:                    
                    '<md-button class="md-icon-button" ng-click="grid.appScope.vm.editRecord(row.entity)"><md-icon md-font-icon="material-icons" class="md-font material-icons">edit</md-icon></md-button>' +
                    '<md-button class="md-icon-button" ng-click="grid.appScope.vm.deleteRecord(row.entity)"><md-icon md-font-icon="material-icons" class="md-font material-icons">delete</md-icon></md-button>' 
                }
            ],
            
            enableColumnMenus: false,
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
            $scope.gridOptions.data = vm.blockMakers;           
            ProductCategoryService.loadProducts('blockMaker');
            vm.products = ProductCategoryService.products;
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
            var list = vm.blockMakers;
            var results = [];
            if (filter.productDescription) {
                for (var i = 0; i < list.length; i++) {
                    if (filter.productDescription.toLowerCase() == list[i].productDesricption.toLowerCase()) {
                        results.push(list[i]);
                    }
                }
            }
            if (filter.fromDate && filter.toDate) {
                for (var i = 0; i < list.length; i++) {
                    var createdDate = new Date(list[i].createdDate);
                    if (filter.fromDate <= createdDate && filter.toDate >= createdDate) {
                        results.push(list[i]);
                    }
                }
            }          
            $scope.gridOptions.data = results;
        }
    }

    angular.module('MIPM').controller('BlockMakerController', BlockMakerController);
    BlockMakerController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', '$scope', 'ProductCategoryService', 'modal'];

})();
