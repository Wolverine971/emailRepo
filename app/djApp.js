(function () {
    'use strict';

    window.APP = window.APP || {};
    APP.NAME = "djApp";

    angular
        .module(APP.NAME, [
        'ui.router'
        , 'ui.bootstrap'
        ]);

})();