'use strict';

/**
 * @ngdoc function
 * @name mediosSuciosFrontApp.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the mediosSuciosFrontApp
 */
angular.module('mediosSuciosFrontApp')
  .controller('ContentCtrl', function(Prismic, $routeParams) {

    var vm = this;

    vm.init = init;
    vm.setPages = setPages;
    vm.findPage = findPage;

    vm.init();

    function init() {
      Prismic.all().then(vm.setPages).then(findPage);
    }

    function setPages(data) {
      vm.pages = data.results;
      vm.generalContent = vm.pages.find(function(page) {
        return page.type === 'contenido_general';
      });

      vm.pages = vm.pages.filter(function(page) {
        return page.type === 'pagina';
      });

      return vm.pages;
    }

    function findPage(pages) {
      //console.log(pages);
      var slug = $routeParams.contentSlug;
      vm.content = pages.find(function(page) {
        return slug === page.slug;
      });
      console.log(vm.content);

    }

  });
