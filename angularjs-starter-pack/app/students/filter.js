'use strict';
(function () {
    angular.module('Myapp')
    .filter('startFrom',function(){
        return function(listData,start){
            return listData.slice(start);
        }
    });
})();