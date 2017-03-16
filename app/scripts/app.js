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
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
