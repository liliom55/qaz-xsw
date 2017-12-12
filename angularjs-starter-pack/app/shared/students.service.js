'use strict';
(function () {
    angular.module('Myapp')
        .factory('studentsSrv', ['$http','$routeParams',
            function ($http,$routeParams) {
                let url = 'https://jsonplaceholder.typicode.com/users';
                return {
                    allStudents: function () {
                        return $http.get(url)
                            .then((response) => {
                                return response.data;
                            });
                    },
                    student:function(){
                        return $http({
                            url: url,
                            method: "get",
                            params: { id: $routeParams.id } 
                        })
                        .then((response) => {
                            return response.data;
                        });
                    }
                };
            }
        ]);
})();
