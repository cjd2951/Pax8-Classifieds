(function() {
 'use strict';

 angular.module('app')
   .component('itemEdit', {
     controller: itemEditController,
     templateUrl: '/js/item/itemEdit.template.html'
   });

   itemEditController.$inject = ['$http', '$stateParams', '$state', 'itemService'];

   function itemEditController($http, $stateParams, $state, itemService){
     const vm = this;

     vm.$onInit = $onInit;
     vm.editItem = editItem;
     vm.deleteItem = deleteItem;

     vm.itemService = itemService;

     vm.captchaKey = "6LeShEEUAAAAALc6ej2mCc_W8R8Ljeo6DKRC0KCA";
     vm.captchaToken = null;

    //  function $onInit() {
    //    $http.get(`/classifieds/${$stateParams.id}`)
    //      .then((response) => {
    //        vm.item = response.data;
    //      });
    //  }

    function $onInit() {
      itemService.getItem(`${$stateParams.id}`)
       .then((item) => {
         vm.item = item;
       });
    }

     function editItem() {
       $http.patch(`/classifieds/${$stateParams.id}`, vm.item)
         .then((response) => {
           $state.go('home');
         });
     }

     function deleteItem(){
       console.log('delete');
       $http.delete(`/classifieds/${$stateParams.id}`)
         .then((response) => {
           $state.go('home');
       });
     }
   }

}());
