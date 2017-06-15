'use strict';

/**
 * @ngdoc function
 * @name mediosSuciosFrontApp.controller:ContactoCtrl
 * @description
 * # ContactoCtrl
 * Controller of the mediosSuciosFrontApp
 */
angular.module('mediosSuciosFrontApp')
  .controller('ContactoCtrl', function(Prismic, $http) {
    var vm = this;

    vm.init = init;
    vm.setPages = setPages;
    vm.submitContact = submitContact;
    vm.reporting = false;
    vm.done = false;

    vm.init();

    function init() {
      Prismic.all().then(vm.setPages);
    }

    function setPages(data) {
      vm.pages = data.results;
      vm.generalContent = vm.pages.find(function(page) {
        return page.type === 'contenido_general';
      });
      vm.pages = vm.pages.filter(function(page) {
        return page.type === 'pagina';
      });
    }

    function submitContact() {
      vm.reporting = true;
      vm.done = false;
      var req = {
        method: 'POST',
        url: 'https://formspree.io/sonny@spaceshiplabs.com',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          name: vm.contact.name,
          email : vm.contact.email,
          message : vm.contact.message
        }
      };
      console.log(req);
      $http(req).then(function(res){
      	console.log(res);
      	vm.reporting = false;
      	vm.done = true;
      });

    }


  });
