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
    'ngMessages',
    'chart.js'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/content/:contentSlug', {
        templateUrl: 'views/content.html',
        controller: 'ContentCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });

    moment.locale('es');
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://medios-sucios-api.herokuapp.com/');
    //RestangularProvider.setBaseUrl('http://localhost:1337/');
  })
  .config(function($mdThemingProvider) {
    var mediosSuciosTheme = $mdThemingProvider.extendPalette('indigo', {
      '500': '#2D303A',
    });

    $mdThemingProvider.definePalette('pinkMS', mediosSuciosTheme);

    $mdThemingProvider.theme('default')
      .primaryPalette('pinkMS');

  })
  .config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({ 
      colors : [ '#f0b4bd', '#fff', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] 
      //default colors: 
      //colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] 
    });
  }); 
