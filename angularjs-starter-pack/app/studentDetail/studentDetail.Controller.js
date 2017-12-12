'use strict';
(function(){
    angular.module('Myapp')
    .controller("studentDetailController", function (studentselected,studentsSrv,$location) {
        this.message = "Students detail Page";
        this.back=()=>{
            $location.url("/students")
        }
        studentsSrv.student().then((res)=>{
            this.student = res[0];
        });
        //another way:(resolve in config)
        //this.student = studentselected;
    })
})();