(function () {
    'use strict';

    function SteelWorkerController($location, $firebaseArray, firebaseUrl, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Steel Worker";
        vm.icon = "toys";
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
            rowHeight: 35,
            enableVerticalScrollbar: 0,
            enableHorizontalScrollbar: 0,
            exporterCsvColumnSeparator: ';',
            enableGridMenu: true,
            enableSelectAll: false,
            enableSorting: true,
            exporterCsvFilename: 'Steel Worker.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [0, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "STEEL WORKER REPORT", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true, alignment: 'center' };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true, alignment: 'center' };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            }
        };

        init();
        function init() {
            vm.steelWorkers = $firebaseArray(ref.child('SteelWorker'));
            vm.steelWorkers.$loaded(function (data) {
                vm.gridOptions.data = data;
                ProductCategoryService.loadProducts('steelWorker');
                vm.products = ProductCategoryService.products;
            })
        }

        vm.newRecord = function () {
            ProductCategoryService.assignCurrentRecord(undefined);
            var templateUrl = '/app/components/productCategory/steelWorker/addEditSteelWorker/addEditSteelWorker.html';
            modal.show(templateUrl, 'AddEditSteelWorkerController').then(function () {
            });
        }

        vm.deleteRecord = function (row) {
            vm.steelWorkers.$remove(row);
        }

        vm.editRecord = function (row) {
            ProductCategoryService.assignCurrentRecord(row);
            var templateUrl = '/app/components/productCategory/steelWorker/addEditSteelWorker/addEditSteelWorker.html';
            modal.show(templateUrl, 'AddEditSteelWorkerController').then(function () {
            });
        }
        vm.filter = function (filter) {
            var list = angular.copy(vm.steelWorkers);
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

    angular.module('MIPM').controller('SteelWorkerController', SteelWorkerController);
    SteelWorkerController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', 'ProductCategoryService', 'modal'];
})();   
