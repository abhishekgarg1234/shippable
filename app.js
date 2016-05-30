    var module = angular.module('myApp', []);


    module.controller("myCtrl", ['$scope', '$http', 'util', function($scope, $http, util) {
        $scope.getData = function() {
            if ($scope.repoName == undefined) {
                return;
            }
            $scope.totalOpenissues = null;;
            $scope.last24Hours = null;
            $scope.last24butLess7 = null;
            $scope.moreThan7days = null;

            var reponame = $scope.repoName.replace("https://github.com/", "");

            var apiUrl = "https://api.github.com/search/issues?q=is:open+repo:" + reponame;
            var last24 = util.convertDate(86400000);
            var last7 = util.convertDate(604800000);

            var last24Hours = apiUrl + "+created:>" + last24;
            var last24butLess7 = apiUrl + "+created:<" + last24 + "&created:>" + last7;
            var moreThan7days = apiUrl + "+created:<" + last7;

            util.getApi(apiUrl).then(function(response) {
                $scope.totalOpenissues = response.data.total_count;
            });

            util.getApi(last24Hours).then(function(response) {
                $scope.last24Hours = response.data.total_count;
            });

            util.getApi(last24butLess7).then(function(response) {
                $scope.last24butLess7 = response.data.total_count;
            })

            util.getApi(moreThan7days).then(function(response) {
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
            convertDate: function(num) {
                var d1 = new Date();
                var tt = Number(d1) - 86400000;
                var d = new Date(tt);
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
            }
        }
    }]);
