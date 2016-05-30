    var module = angular.module('myApp', []);


    module.controller("myCtrl", ['$scope', '$http', 'util', function($scope, $http, util) {
        $scope.getData = function() {
            console.log("entered");

            var apiUrl = "https://api.github.com/search/issues?q=is:open+repo:" + $scope.repoName;

            var last24Hours = apiUrl + "+created:>" + util.last24();
            var last24butLess7 = apiUrl + "+created:<" + util.last24() + "+created:>" + util.last7day();
            console.log(last24butLess7);
            var moreThan7days = apiUrl + "+created:<" + util.last7day();
            // created: > 2016 - 05 - 30 T07: 30: 00

            util.getApi(apiUrl).then(function(response) {
                console.log(response);
                $scope.totalOpenissues = response.data.total_count;
            });

            util.getApi(last24Hours).then(function(response) {
                console.log(response);
                $scope.last24Hours = response.data.total_count;
            });

            util.getApi(last24butLess7).then(function(response) {
                console.log(response);
                $scope.last24butLess7 = response.data.total_count;
            })

            util.getApi(moreThan7days).then(function(response) {
                console.log(response);
                $scope.moreThan7days = response.data.total_count;
            })
        }
    }]);

    module.factory('util', ['$http', function($http) {
        return {
            getApi: function(apiUrl, callback) {
                console.log("apiUrl " + apiUrl);
                return $http.get(apiUrl);
            },
            last24: function() {
                var d = new Date();
                var month = (d.getUTCMonth() + 1);
                if (month <= 9) {
                    month = "0" + month;
                }
                var day = d.getUTCDate();
                if (day <= 9) {
                    day = "0" + day;
                }
                var hours = d.getUTCHours();
                if (hours <= 9) {
                    hours = "0" + hours;
                }
                var minutes = d.getUTCMinutes();
                if (minutes <= 9) {
                    minutes = "0" + minutes;
                }
                var seconds = d.getUTCSeconds();
                if (seconds <= 9) {
                    seconds = "0" + seconds;
                }
                var date = d.getUTCFullYear() + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
                return date;
            },
            last7day: function() {
                var d1 = new Date();
                var tt = Number(d1) - 604800000;
                var d = new Date(tt);
                var month = (d.getUTCMonth() + 1);
                if (month <= 9) {
                    month = "0" + month;
                }
                console.log("month " + month);
                var day = d.getDate();
                if (day <= 9) {
                    day = "0" + day;
                }
                var hours = d.getUTCHours();
                if (hours <= 9) {
                    hours = "0" + hours;
                }
                var minutes = d.getUTCMinutes();
                if (minutes <= 9) {
                    minutes = "0" + minutes;
                }
                var seconds = d.getUTCSeconds();
                if (seconds <= 9) {
                    seconds = "0" + seconds;
                }
                var date = d.getUTCFullYear() + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
                console.log(date);
                return date;
            }
        }
    }]);

    // 2016 - 05 - 30
