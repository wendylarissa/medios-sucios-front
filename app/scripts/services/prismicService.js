'use strict';

/**
 * @ngdoc service
 * @name mediosSuciosFrontApp.prismicService
 * @description
 * # prismicService
 * Service in the mediosSuciosFrontApp.
 */
angular.module('mediosSuciosFrontApp')
  .service('prismicService', function($http) {

    this.getAll = function() {
      var params = {
        ref: 'WTiKMSgAACYA3QJb',
        format: 'json'
      };
      return $http.get('https://medios-sucios.prismic.io/api/v1/documents/search', { params: params });
    };

    this.getByUID = function(uid) {
      var params = {
        ref: 'WTiKMSgAACYA3QJb',
        format: 'json',
        q: '[[:d = at(my.pagina.uid, "' + uid + '")]]'
      };
      return $http.get('https://medios-sucios.prismic.io/api/v1/documents/search', { params: params });
    };

  });
