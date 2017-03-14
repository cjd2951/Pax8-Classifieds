"use strict";

(function() {

  angular
    .module('app')
    .service('itemService', service);

  function service($http) {

    this.getItems =() => {
      return $http.get('/classifieds')
        .then((response) => {
          return response.data;
        });
    };

    this.getItem =(id) => {
      return $http.get(`/classifieds/${id}`)
        .then((response) => {
          return response.data;
        });
    };

  }


}());
