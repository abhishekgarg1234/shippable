    var module = angular.module('myApp', []);


    module.controller("myCtrl", ['$scope', '$http', '$q', 'util', function($scope, $http, $q, util) {
        $scope.getData = function() {
            // return nothing if no  link is entered
            if ($scope.repoName == undefined) {
                return;
            }

            // making all the values null before fetching data
            $scope.totalOpenissues = null;;
            $scope.last24Hours = null;
            $scope.last24butLess7 = null;
            $scope.moreThan7days = null;

            var reponame = $scope.repoName.replace("https://github.com/", "");

            var apiUrl = "https://api.github.com/search/issues?q=is:open+repo:" + reponame;
            // function to get date time according to the given milliseconds
            var last24 = util.convertDate(86400000);
            console.log(last24);
            var last7 = util.convertDate(604800000);
            console.log(last7);

            var last24Hours = apiUrl + "+created:>" + last24;
            var last24butLess7 = apiUrl + "+created:<" + last24 + "&created:>" + last7;
            var moreThan7days = apiUrl + "+created:<" + last7;
            var promiseArray = [];

            // api call for total issues count
            promiseArray.push(
                util.getApi(apiUrl).then(function(response) {
                    $scope.totalOpenissues = response.data.total_count;
                })
            );

            //api call for Number of open issues that were opened in the last 24 hours
            promiseArray.push(
                util.getApi(last24Hours).then(function(response) {
                    $scope.last24Hours = response.data.total_count;
                })
            );

            // api call for - Number of open issues that were opened more than 7 days ago 
            promiseArray.push(
                util.getApi(moreThan7days).then(function(response) {
                    $scope.moreThan7days = response.data.total_count;

                })
            );

            //api call for - Number of open issues that were opened more than 24 hours ago but less than 7 days ago
            $q.all(promiseArray).then(function() {
                $scope.last24butLess7 = parseInt($scope.totalOpenissues) - parseInt($scope.moreThan7days) - parseInt($scope.last24Hours);
            });


        }
    }]);
