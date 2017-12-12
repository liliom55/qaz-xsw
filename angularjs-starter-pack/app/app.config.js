'use strict';
(function () {
    angular.module('Myapp')
        .config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $routeProvider.
                    when('/home', {
                        templateUrl: 'home/home.template.html',
                        controller: 'homeController',
                        controllerAs: "homeCtrl",
                    }).
                    when('/courses', {
                        templateUrl: 'courses/courses.template.html',
                        controller: 'coursesController',
                        controllerAs: "coursCtrl",
                    }).
                    when('/students', {
                        templateUrl: 'students/students.template.html',
                        controller: 'studentsController',
                        controllerAs: "stdentCtrl",
                        resolve: {
                            studentslist: ($http)=> {
                                return $http.get("https://jsonplaceholder.typicode.com/users")
                                    .then((response)=> {
                                        return response.data;
                                    })
                            }
                        },
                    }).
                    when('/students/:id', {
                        templateUrl: 'studentDetail/studentDetail.template.html',
                        controller: 'studentDetailController',
                        controllerAs: "stdentDetailCtrl",
                        resolve: {
                            studentselected:($http,$route)=>{
                                console.log('--> ',$route.current.params);
                                return $http({
                                    url: 'https://jsonplaceholder.typicode.com/users',
                                    method: "get",
                                    params: { id: $route.current.params.id }
                                })
                                .then((response) => {
                                    return response.data;
                                });
                            }
                            
                        },
                    }).otherwise('/home');
                $routeProvider.caseInsensitiveMatch = true;
            }
        ])
})();
