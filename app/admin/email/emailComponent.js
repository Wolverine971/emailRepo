(function () {
    "use strict";

    angular.module('djApp')
    .component('email',
    {
        templateUrl: '/app/admin/email/EmailPage.html',
        controller: 'emailController',
        controllerAs: 'emailCont'
    })
})();