(function() {
  'use strict';

  angular.module('app')
    .component('itemList', {
      controller: itemListController,
      templateUrl: '/js/item/itemList.template.html'
    });

    itemListController.$inject = ['$http', 'itemService'];

    function itemListController($http, itemService){
      const vm = this;

      //add itemService to inject and as argument to function
      // vm.itemService = itemService;

      vm.newItemForm = false;
      vm.$onInit = $onInit;
      vm.createItem = createItem;
      vm.openForm = openForm;

      vm.itemService = itemService;

      vm.captchaKey = "6LffS0EUAAAAAKmhNIY4MewMU1bzphBHdpXz6RRD";
      vm.captchaToken = null;

      // function $onInit(){
      //   $http.get('/classifieds')
      //     .then((response) => {
      //       vm.items = response.data;
      //     });
      // }

      function $onInit(){
        itemService.getItems()
          .then((items) =>{
            vm.items = items;
            // console.log(items);
          });
      }

      function createItem(){
        $http.post('/classifieds', vm.item)
          .then((response) => {
            vm.items.push(response.data);
            vm.newItemForm = false;
            vm.$onInit();
            delete vm.item;
          });
      }

      function openForm(){
        vm.newItemForm = !vm.newItemForm;
      }

    }

}());
