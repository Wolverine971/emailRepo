(function () {
    "use strict";

    angular.module('djApp')
    .component('scraper',
    {
        templateUrl: '/app/admin/scraper/WebScraper.html',
        controller: 'scraperController',
        controllerAs: 'scraper'
    })
})();