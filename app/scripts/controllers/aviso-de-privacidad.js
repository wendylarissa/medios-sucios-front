'use strict';

/**
 * @ngdoc function
 * @name mediosSuciosFrontApp.controller:AvisoDePrivacidadCtrl
 * @description
 * # AvisoDePrivacidadCtrl
 * Controller of the mediosSuciosFrontApp
 */
angular.module('mediosSuciosFrontApp')
  .controller('AvisoDePrivacidadCtrl', function(Prismic) {
    var vm = this;

    vm.init = init;
    vm.setPages = setPages;

    vm.init();

    function init() {
      Prismic.all().then(vm.setPages);
    }

    function setPages(data) {
      vm.pages = data.results;
      vm.generalContent = vm.pages.find(function(page) {
        return page.type === 'contenido_general';
      });


      return vm.pages;
    }

  });
