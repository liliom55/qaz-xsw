'use strict';
(function(){
    angular.module('Myapp')
    .controller("homeController", function ($rootScope, $route,$scope) {
        this.message = "Home Page";
        this.reloadData = function () {
            $route.reload();
        }
        $scope.$on("$routeChangeStart", function (event, next, current) {
            console.log("RouteChangeStart Event");
            console.log('event',event);
            console.log('next',next);
            console.log('current',current);
        });
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            // // for athuntification purpose
            // if(next == 'http://localhost:8000/#!/students'){
            //     alert('you can not navigate to this page!');
            //     event.preventDefault();
            // }
            console.log("LocationChangeStart Event");
            console.log('event',event);
            console.log('next',next);
            console.log('current',current);
        });
        $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
            console.log("$locationChangeSuccess fired");
            console.log('event',event);
            console.log('next',next);
            console.log('current',current);
        });
    
        $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
            console.log("$routeChangeSuccess fired");
            console.log('event',event);
            console.log('next',next);
            console.log('current',current);
        });

    })
})();