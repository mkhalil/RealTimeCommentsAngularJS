angular.module("realTimeComments", ["ngRoute", "ngResource"])

    .config(function ($routeProvider) {
        $routeProvider.when("/login", {
            templateUrl: "views/login.html"
        });

        $routeProvider.when("/home", {
            templateUrl: "views/home.html"
        });

        $routeProvider.otherwise({
            redirectTo: "login"
        });
    })

    .constant("authUrl", "http://localhost:8080/RealTimeComments-web/api/login.json")

    .controller("authCtrl", function ($scope, $http, $location, authUrl) {
        $scope.authenticate = function (user, pass) {
            $http.post(authUrl,
                {username: user, password: pass },
                {withCredentials: true}
            ).success(function (data) {
                $location.path("/home");
            }).error(function (error) {
                $scope.authenticationError = error;
            });
        }
    });