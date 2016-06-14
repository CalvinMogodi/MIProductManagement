(function () {
    'use strict';

    function BlockMakerController($location, $firebaseArray, firebaseUrl, $scope, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.heading = "Block Maker";
        vm.icon = "add_box";

        $scope.gridOptions = {
            columnDefs: [
              { field: 'productDescription', displayName: 'Product Description', width: '300' },
              { field: 'total', displayName: 'Total', width: '90' ,cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                  if (grid.getCellValue(row,col) == 1) {
                      return 'blue';
                  }
                  return 'green';
              }},
              { field: 'used', displayName: 'Used', width: '90'},
              { field: 'createdDate', displayName: 'Date Created'},
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

        var addTotalToTalbe = function (results) {
            var used = 0, total = 0;

            for (var i = 0; i < results.length; i++) {
                used = parseInt(used + parseInt(results[i].used));
                total = parseInt(total + parseInt(results[i].total));
            }

            var emptyRow = {
                productDescription: '',
                total: '',
                used: '',
                createdDate: '',
                Actions: '',
            };
            var TotalRow = {
                productDescription: 'Total',
                total: total,
                used: used,
                createdDate: '',
                Actions: undefined,
            };
            results.push(emptyRow);
            results.push(TotalRow);
            $scope.gridOptions.data = results;
        }

        init();
        function init() {
            vm.blockMakers = $firebaseArray(ref.child('BlockMaker'));
            vm.blockMakers.$loaded(function (data) {
                addTotalToTalbe(data);
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

        vm.export = function () {
            $scope.export_format = 'csv';
            if ($scope.export_format == 'csv') {
                var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                $scope.gridApi.exporter.csvExport('all', 'all');
            } else if ($scope.export_format == 'pdf') {
                $scope.gridApi.exporter.pdfExport($scope.export_row_type, $scope.export_column_type);
            };
        };
       
        vm.filter = function (filter) {
            var list = vm.blockMakers;
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
            addTotalToTalbe(results);
        }
        vm.clear = function () {
            vm.filter = undefined;
        }
        
    }

    angular.module('MIPM').controller('BlockMakerController', BlockMakerController);
    BlockMakerController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', '$scope', 'ProductCategoryService', 'modal'];

})();
