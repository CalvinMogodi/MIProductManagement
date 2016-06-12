(function () {
    'use strict';

    function BlockMakerController($location, $firebaseArray, firebaseUrl, $scope, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [250, 500, 1000],
            pageSize: 250,
            currentPage: 1
        };
       
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data;
                if (searchText) {
                    var ft = searchText.toLowerCase();
                    //$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                    //    data = largeLoad.filter(function (item) {
                    //        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //    });
                    $scope.setPagingData(vm.data, page, pageSize);
                    //});
                } else {
                    //$http.get('jsonFiles/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(vm.data, page, pageSize);
                    //});
                }
            }, 100);
        };

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

            enablePaging: true,
            showFooter: true,
            totalServerItems: 'totalServerItems',
            pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,

            enableScrollbars: false, 
            enableColumnMenus: false,
            //enableHorizontalScrollbar: 1,
            //enableVerticalScrollbar: 1,
           
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
            //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }

        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };

        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
      

        vm.newRecord = function () {           
            ProductCategoryService.assignCurrentRecord(undefined);
            var templateUrl = '/app/components/productCategory/blockMaker/addEditBlockMaker/addEditBlockMaker.html';
            modal.show(templateUrl, 'AddEditBlockMakerController').then(function () {
            });
        }

        $scope.edit = function (row) {
            alert('working');
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
