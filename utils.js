module.factory('util', ['$http', function($http) {
    return {
        // api call
        getApi: function(apiUrl) {
            console.log(apiUrl);
            return $http.get(apiUrl);
        },
        // give date in api format from given time
        convertDate: function(num) {
            var d1 = new Date();
            var tt = Number(d1) - num;
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
