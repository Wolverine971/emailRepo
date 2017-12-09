//Main Controller
(function () {
    "use strict";
    angular.module('djApp')
        .controller('faqController', faqCont);
    faqCont.$inject = ['faqService']

    function faqCont(faqService) {
        var vm = this;
        vm.faqService = faqService;
        vm.myQuestion = [];
        vm.sMyQuestion = sMyQuestion;
        vm.items = [];
        vm.filteredItems = [];
        // creates new property of the vm object in the controller
        vm.item = null;
        vm.itemIndex = -1;
        vm.select = _select;
        vm.save = _save;
        vm.cancel = _cancel;
        vm.add = _add;
        vm.delete = _delete;
        vm.sResults = [];
        vm.editForm = null;

        vm.data = {}
        vm.$onInit = _init;

        vm.currentPage = 1;
        vm.itemsPerPage = 8;
        vm.totalItems = 1000;
        vm.itemsPerPageOptions = [4, 8, 12, 16];
        vm.searchText = '';
        vm.orderBy = 'name';
        vm.reverse = '';
        vm.filter = _filter;

        vm.hasValidationError = _hasValidationError;
        vm.showValidationError = _showValidationError;

        function sMyQuestion(myQuestion) {
            for (var i = 0; i < items.length; i++) {
                if (data.items.object.question.val() == myQuestion.val()) {
                    data.item == sResults;
                }
            }
        }

        //----------------------filter
        function _filter() {
            vm.filteredItems = vm.items.filter(_faqFilter);
        }
        function _faqFilter(faq) {
            if (!vm.searchText) {
                return true;
            }
            var searchString = vm.searchText.toUpperCase();
            return (faq.question.toUpperCase().indexOf(searchString) > -1)
                || (faq.answer.toUpperCase().indexOf(searchString) > -1);
        }


        //---------GetAll-----------------
        function _init() {
            vm.faqService.getAll().then(_getAllSuccess, _getAllError);
        }
        function _getAllSuccess(data) {
            if (data && data.items) {
                vm.items = data.items;
                _filter();
            }
            console.log("got the items");
        }
        function _getAllError(error) {
            if (error && error.message) {
                console.log(error.message, "get all failed");
            }
            else {
                console.log("unable to retrieve data", "get all failed");
            }
        }
        //---------SelectById-------------
        function _select(item, index) {
            // Keep track of the position in vm.items of
            // the item we will be editing
            vm.itemIndex = index;
            // get a fresh copy of the object to be edited from the database.
            vm.faqService.getById(item.id)
                .then(_getByIdSuccess, _getByIdError)
            vm.editForm.$setPristine();
            $("#save").text("Update");
        }

        function _getByIdSuccess(data) {
            if (data && data.item) {
                vm.item = data.item;
            }
            else {
                console.log("Item has been deleted from the system.")
            }
        }

        function _getByIdError(error) {
            if (error && error.message) {
                console.log(error.message, "GetById failed");
            }
            else {
                console.log("Unable to retrieve data", "GetById failed");
            }
        }
        //--------Edit/Add, Update/Post---------
        function _add() {
            // Changing item from null to empty object indicates any
            // ui components for editing should be shown
            vm.item = {};
            vm.itemIndex = -1;
            // set the form $submitted to false and the form and all controls $dirty to false
            vm.editForm.$setPristine();
            console.log("you sexy mofo");
            $("#save").text("Save");

        }

        function _cancel() {
            _endEdit();
        }

        function _endEdit() {
            console.log("failed in endEdit")
            vm.item = null;
            vm.itemIndex = -1;
        }

        function _save(isValid) {
            if (vm.editForm.$invalid) {
                vm.hasValidationError();
                console.log('Some information is not entered correctly, please review the validation messages and try again.',
                    'Save Failed');
                return;
            }
            if (vm.item.id) {
                vm.faqService.put(vm.item)
                    .then(_putSuccess, _putError);
                console.log("tried to put")
            }
            else {
                vm.faqService.post(vm.item)
                    .then(_postSuccess, _postError);
                console.log("tried to post");
            }
        }

        function _putSuccess(data) {
            // To update UI, replace with new version
            vm.items[vm.itemIndex] = vm.item;
            _endEdit();
            console.log("Update successful");
            vm.faqService.getAll().then(_getAllSuccess, _getAllError)
        }

        function _putError(error) {
            if (error && error.message) {
                console.log(error.message, "Update failed");
            }
            else {
                console.log("Unable to retrieve data", "Update failed");
            }
        }

        function _postSuccess(data) {
            if (data && data.item) {
                // To update UI, get id from data
                vm.item.id = data.item;
                vm.items.push(vm.item);
                _endEdit();
                console.log("Insert successful");
                vm.faqService.getAll().then(_getAllSuccess, _getAllError)
            }
        }

        function _postError(error) {
            if (error && error.message) {
                console.log(error.message, "Insert failed");
            }
            else {
                console.log("Unable to retrieve data", "Insert failed");
            }
        }

        function _delete() {
            if (vm.item.id) {
                vm.faqService.delete(vm.item.id)
                    .then(_deleteSuccess, _deleteError);
            }
        }

        function _deleteSuccess(data) {
            // To update UI, replace with new version
            vm.items.splice(vm.itemIndex, 1);
            _endEdit();
            console.log("Delete successful");
        }

        function _deleteError(error) {
            if (error && error.message) {
                console.log(error.message, "Delete failed");
            }
            else {
                console.log("Unable to delete item", "Delete failed");
            }
        }

        function _hasValidationError(propertyName) {
            return (vm.editForm.$submitted || vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$invalid;

        }

        function _showValidationError(propertyName, ruleName) {
            return (vm.editForm.$submitted || vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$error[ruleName];

        }
    }

})();
//External Factory
//[ui-router] uses templates,
//you got to inject it into the controller
// myApp.config(_configurations)
//_configuration $inject = ["$stateprovider"]
//function _configuration($stateProvider) {
//	$stateProvider.state({
//		name: "home",
//		component: "homecommpound",
//		url: "/home"
//	})
//	myApp.component("homeComponent", {
//		templateURL: "/homehtml"
//		controller: "homeController"
//	})
//}
//refer to it with $ctrl.whateverItsCalledInYourForm

//myApp.config is a separate thing in a separate file
// on success $state.go("home")
