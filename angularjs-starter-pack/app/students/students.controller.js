'use strict';
(function () {
    angular.module('Myapp')
        .controller("studentsController", function (studentslist, studentsSrv, $route, $scope,$log) {
            this.message = "Students Page";
            
            // when you want to reload just the current route instead of the entire app
            this.reloadData = () => {
                $route.reload();
            }
            //if you want to warn a user when they are navigating away from a page with unsaved changes
            $scope.$on("$routeChangeStart", function (event, next, current) {
                if (!confirm("Are you sure you want to navigate away from this page")) {
                    event.preventDefault();
                }
            });
            // studentsSrv.allStudents().then((res) => {
            //     this.studentList = res;
            // });
            //another way:(resolve in config)
            this.studentList = studentslist;
            //pagination
            this.currentPage = 1;
            this.pageSize = 5;
            this.totalItems = this.studentList.length;
            this.maxSize = 5;
            this.bigTotalItems = this.studentList.length;
            this.bigCurrentPage = 1;
            this.setPage = function (pageNo) {
                this.currentPage = pageNo;
              };
            
              this.pageChanged = function() {
                $log.log('Page changed to: ' + this.currentPage);
              };
            // programatically filling table
            this.propertyNames = Object.getOwnPropertyNames(this.studentList[0]);
            this.findStudent = (student) => {
                this.studentfinded = Object.assign({}, student); //shadow copy
            }

        })
})();