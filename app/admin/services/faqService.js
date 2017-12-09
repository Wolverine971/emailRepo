(function () {
    "use strict";
    angular.module('djApp')
		.factory('faqService', faq);

    faq.$inject = ['$http', '$q'];

    function faq($http, $q) {
        return {
            getAll: _getAll,
            getById: _getById,
            post: _post,
            put: _put,
            delete: _delete
        };

        function _getAll() {
            var settings = {
                headers: { "SABIO-AUTH": "U4UG05M6F"},
                url: 'https://pacoima-ypi.azurewebsites.net/api/faqs/user',
                method: 'GET',
                cache: false,
                withCredentials: true,
                responseType: 'json'
            };
            return $http(settings)
				.then(_getAllComplete, _getAllFailed);
        }
        //get all api/faqs
        function _getAllComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _getAllFailed(error) {
            var msg = 'Failed to retrieve users';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _getById(id) {
            var settings = {
                url: 'https://pacoima-ypi.azurewebsites.net/api/faqs/' + id,
                method: 'GET',
                cache: false,
                withCredentials: true,
                responseType: 'json'
            };
            return $http(settings)
				.then(_getByIdComplete, _getByIdFailed);
        }

        function _getByIdComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _getByIdFailed(error) {
            var msg = 'Failed to retrieve user';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _post(faq) {
            var settings = {
                url: 'https://pacoima-ypi.azurewebsites.net/api/faqs',
                method: 'POST',
                cache: false,
                withCredentials: true,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(faq)
            };
            return $http(settings)
				.then(_postComplete, _postFailed);
        }

        function _postComplete(response) {
            // unwrap the data from the response
            console.log("it werked");
            return response.data;

        }

        function _postFailed(error) {
            var msg = 'Failed to insert user';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject.error;
        }

        function _put(faq) {
            var settings = {
                url: 'https://pacoima-ypi.azurewebsites.net/api/faqs/' + faq.id,
                method: 'PUT',
                cache: false,
                withCredentials: true,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(faq)
            };
            return $http(settings)
				.then(_putComplete, _putFailed);
        }

        function _putComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _putFailed(error) {
            var msg = 'Failed to update user';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _delete(id) {
            var settings = {
                url: 'https://pacoima-ypi.azurewebsites.net/api/faqs/' + id,
                method: 'DELETE',
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
				.then(_deleteComplete, _deleteFailed);
        }

        function _deleteComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _deleteFailed(error) {
            var msg = 'Failed to delete user';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

    }
})();