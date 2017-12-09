(function () {
    "use strict";

    angular
    .module('djApp')
    .controller('scraperController', scraperController)

    scraperController.$inject = [
        'scrapeService'
    ];

    function scraperController(
        scrapeService) {

        const vm = this;
        vm.scrapeService = scrapeService;
        vm.scrapeWebsite = "";
        vm.scrapeChoice = "";
        vm.search = _search;
        vm.searchWord = "";
        vm.scrapeOptions = ['href', 'image', 'word'];

        vm.scrapedLinks = [];

        function _search() {
            var search = "";
            if (vm.scrapeChoice == 'word') {
                search = vm.searchWord;
            }
            else {
                search = vm.scrapeChoice;
            }
            var data = {}
            data.Website = vm.scrapeWebsite;
            data.SearchingFor = search;

            vm.scrapeService.post(data).then(_scrapeSuccessful, _scrapeFailed);
        }

        function _scrapeSuccessful(data) {

            vm.scrapedLinks = data;
            console.log(vm.scrapedLinks[1]);
            console.log(data);
        }
        function _scrapeFailed(error) {
            console.log("failed");
        }
    }
})();