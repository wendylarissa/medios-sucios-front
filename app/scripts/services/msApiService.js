'use strict';

/**
 * @ngdoc service
 * @name mediosSuciosFrontApp.msApiService
 * @description
 * # msApiService
 * Service in the mediosSuciosFrontApp.
 */
angular.module('mediosSuciosFrontApp')
  .service('msApiService', function($http, Restangular) {

    this.Report = Restangular.all('report');

    this.submitReport = function(report) {
      return this.Report.post(report);
    };

    this.getReports = function(query) {
      var defaults = { sort: 'createdAt DESC' };
      angular.extend(defaults, query);
      return this.Report.getList(defaults);
    };

    this.getSourceCount = function(){
      var baseUrl = Restangular.configuration.baseUrl;
      return $http.get(baseUrl + '/sourcecount');
    };

    this.getMotiveCount = function(){
      var baseUrl = Restangular.configuration.baseUrl;
      return $http.get(baseUrl + '/motivecount');
    };

    this.getDateReportCount = function(){
      var baseUrl = Restangular.configuration.baseUrl;
      return $http.get(baseUrl + '/datecount');
    }; 

  });
