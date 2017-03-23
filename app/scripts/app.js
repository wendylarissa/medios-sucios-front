'use strict';

/**
 * @ngdoc overview
 * @name mediosSuciosFrontApp
 * @description
 * # mediosSuciosFrontApp
 *
 * Main module of the application.
 */
angular
  .module('mediosSuciosFrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'restangular',
    'ngMessages'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://medios-sucios-api.herokuapp.com/');
    //RestangularProvider.setBaseUrl('http://localhost:1337/');
  });
