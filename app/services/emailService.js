//services\emailService.js
(function () {
    "use strict";
    angular.module('djApp')
        .factory('emailService', emailService);

    emailService.$inject = ['$http', '$q'];

    function emailService($http, $q) {
        return {
            send: _send
            //getAll: _getAll
        };

        function _send(data) {
            var settings = {
                url: '/api/email',
                method: 'POST',
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(data),
                withCredentials: true
            };
            return $http(settings)
                .then(_sendComplete, _sendFailed);
        }

        //function _getAll() {
        //    var settings = {
        //        url: '/v3/mail/send',
        //        method: 'POST',
        //        cache: false,
        //        contentType: 'application/json; charset=UTF-8',
        //        data: JSON.stringify(data),
        //        withCredentials: true
        //    };
        //    return $http(settings)
        //        .then(_postTwoComplete, _postTwoFailed);
        //}

        function _sendComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _sendFailed(error) {
            var msg = 'Failed To Post';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

    }
})();