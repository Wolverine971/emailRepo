(function () {
    'use strict';

    window.APP = window.APP || {};
    APP.NAME = "djApp";

    angular
        .module(APP.NAME, [
        'ui.router'
        ]);
    angular.module(APP.NAME).config(configure);
    configure.$inject = ['$stateProvider', '$locationProvider'];

    function configure($stateProvider, $locationProvider){

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: true
        //});

        $stateProvider.state({
            name: 'email',
            component: 'email',
            url: '/email'
        });

        $stateProvider.state({
            name: 'scraper',
            component: 'scraper',
            url: '/scraper'
        });

    }

})();