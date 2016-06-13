(function () {
    'use strict';

    function CivilController($location, $firebaseArray, firebaseUrl, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);

        vm.gridOptions = {
            columnDefs: [
              { field: 'productDescription', displayName: 'Product Description' },
              { field: 'quantity', displayName: 'Quantity' },
              { field: 'createdDate', displayName: 'Date Created' },
              {
                  field: 'Actions', displayName: 'Actions', cellTemplate:
                      '<md-button class="md-icon-button" ng-click="grid.appScope.vm.editRecord(row.entity)"><md-icon md-font-icon="material-icons" class="md-font material-icons">edit</md-icon></md-button>' +
                      '<md-button class="md-icon-button" ng-click="grid.appScope.vm.deleteRecord(row.entity)"><md-icon md-font-icon="material-icons" class="md-font material-icons">delete</md-icon></md-button>'
              }
            ],
            exporterSuppressColumns: ['Actions'],
            enableColumnMenus: false,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            exporterCsvColumnSeparator: ';',
            enableGridMenu: false,
            enableSelectAll: false,
            enableSorting: true,
            exporterCsvFilename: 'Civil Report.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Civil Report", style: 'headerStyle' },
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
            // exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            }
        };

        init();
        function init() {
            vm.civils = $firebaseArray(ref.child('Civil'));
            vm.civils.$loaded(function (data) {
                vm.gridOptions.data = data;
                ProductCategoryService.loadProducts('civil');
                vm.products = ProductCategoryService.products;
            })
        }

        vm.newRecord = function () {
            ProductCategoryService.assignCurrentRecord(undefined);
            var templateUrl = '/app/components/productCategory/civil/addEditCivil/addEditCivil.html';
            modal.show(templateUrl, 'AddEditCivilController').then(function () {
            });
        }

        vm.deleteRecord = function (row) {
            vm.civils.$remove(row);
        }

        vm.editRecord = function (row) {
            ProductCategoryService.assignCurrentRecord(row);
            var templateUrl = '/app/components/productCategory/civil/addEditCivil/addEditCivil.html';
            modal.show(templateUrl, 'AddEditCivilController').then(function () {
            });
        }
        vm.filter = function (filter) {
            var list = vm.civils;
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
            vm.filter = undefined;
        }
    }

    angular.module('MIPM').controller('CivilController', CivilController);
    CivilController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', 'ProductCategoryService', 'modal'];
})();
