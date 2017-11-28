(function () {
    "use strict";
    angular.module('djApp')
		.factory('scrapeService', scrape);

    scrape.$inject = ['$http', '$q'];

    function scrape($http, $q) {
        var apiRoute = "api/scrape/site";
        return {
            post: _post,
        };

        function _post(data) {
            var settings = {
                url: "http://localhost:60810/" + apiRoute,
                method: 'POST',
                cache: false,
                contentType: "application/json; charset=UTF-8;",
                data: JSON.stringify(data)
            };
            return $http(settings)
				.then(_getComplete, _getFailed);
        }
        function _getComplete(response) {
            return response.data;
        }
        function _getFailed(error) {
            var message = "scrape failed";
            if (error.data && error.data.description) {
                message += '\n' + error.data.description;
            }
            error.data.description = message;
            return $q.reject(error);
        }

    }
        
})();