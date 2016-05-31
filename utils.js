var module = angular.module('myApp', []);

var util = function($http) {
    var getApi = function(apiUrl) {
        $http.get(apiUrl)
            .then(function(response) {
                return response.data.total_count;
            });
    }
    var convertDate = function() {

    }
    return {
        getApi: getApi,
        convertDate: convertDate
    }
}
module.factory("util", util);





