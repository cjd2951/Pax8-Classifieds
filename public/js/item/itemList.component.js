(function() {
  'use strict';

  angular.module('app')
    .component('itemList', {
      controller: itemListController,
      templateUrl: '/js/item/itemList.template.html'
    });

    itemListController.$inject = ['$http'];

    function itemListController($http){
      const vm = this;

      vm.newItemForm = false;
      vm.$onInit = $onInit;
      vm.createItem = createItem;
      vm.openForm = openForm;

      function $onInit(){
        $http.get('/classifieds')
          .then((response) => {
            vm.items = response.data;
          });
      }

      function createItem(){
        $http.post('/classifieds', vm.item)
          .then((response) => {
            vm.items.push(response.data);
            vm.newItemForm = false;
            delete vm.item;
          });
      }

      function openForm(){
        vm.newItemForm = !vm.newItemForm;
      }

    }

}());
