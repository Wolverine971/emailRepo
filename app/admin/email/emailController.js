(function () {
    'use strict';

    angular
        .module('djApp')
        .controller('emailController', emailController);

    emailController.$inject = [
        'emailService'
        , 'scrapeService'
    ];

    function emailController(
        emailService
        , scrapeService) {

        var vm = this;

        vm.emailService = emailService;
        vm.$onInit = onInit;
        vm.items = [];
        vm.useThis = null;
        vm.isNew = null;
        vm.editForm = null;
        vm.item = null;
        vm.addHere = null;
        vm.request = _request;
        vm.createNew = _createNew;
        vm.hasValidationError = _hasValidationError;
        vm.showValidationError = _showValidationError;

        vm.email = false;
        vm.showEmail = _showEmail;

        //---------------scrape bindings---------------
        vm.scrapeService = scrapeService;
        vm.scrapeWebsite = "";
        vm.scrapeChoice = "";
        vm.search = _search;
        vm.searchWord = "";
        vm.scrapeOptions = ['href', 'image', 'word'];

        vm.scrapedLinks = [];

        /* OPTIONS FOR SUMMERNOTE DECLARED HERE*/
        vm.options = {
            focus: true,
            height: 400,
            toolbar: [
                ['headline', ['style']],
                ['style', ['bold', 'italic', 'clear']],
                ['fontface', ['fontname']],
                ['textsize', ['fontsize']],
                ['fontclr', ['color']],
                ['view', ['fullscreen']],
                ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                ['height', ['height']]
            ]
        };


        function onInit() {
            //vm.userService.getCurrentUser().then(_getCurrentUserSuccess, _getCurrentUserError);
        }
        function _getCurrentUserSuccess(data) {
            vm.currentUser = data.data.item;
        }
        function _getCurrentUserError(error) {
            console.log(error);
        }

        function _request() {

            console.log("send Request");
            if (vm.editForm.$valid) {
                //var requestData = angular.copy(vm.item);
                //var body = '<h1>Congradulations </h1> your friend ' + vm.currentUser.name + ' has gifted you 1 month of prework at Sabio for $99. <br>' + vm.item.body + 'To claim this benefit, please present this email @ prework orientation';
                var body = vm.item.body;
                var code = 21321;
                var promoCode = 'Use this promo code to get a discount off of Sabio training: ' + code;

                var message = "Moo moo meep moo";
                var requestData = {
                    to: [vm.item.to],
                    subject: vm.item.subject,
                    body: message,
                    from: vm.item.from
                };
                //requestData.to.push(vm.item.to);
                //requestData.subject = vm.item.subject;
                //requestData.body = message;

                vm.emailService.send(requestData)
                    .then(_sendSuccess, _sendError);

                vm.editForm.$setPristine();
            }
            else {
                swal('Failed to Send Email');
            }
        }

        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        function _sendSuccess(data) {
            swal('send successful');
            vm.item = null;
        }

        function _sendError(error) {
            if (error && error.message) {
                swal('Error:' + error.message);
            }
        }

        function _createNew() {
            vm.item = {};
            vm.showIt = true;
            vm.isUpdate = null;
            vm.isNew = {};
        }

        function _hasValidationError(propertyName) {
            return (vm.editForm.$submitted && vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$invalid;
        }

        function _showValidationError(propertyName, ruleName) {
            return (vm.editForm.$submitted && vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$error[ruleName];
        }

        function _showEmail() {
            vm.email = true;
            console.log("email clicked");
        }

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