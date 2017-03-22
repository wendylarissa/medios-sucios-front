'use strict';

/**
 * @ngdoc service
 * @name mediosSuciosFrontApp.msApiService
 * @description
 * # msApiService
 * Service in the mediosSuciosFrontApp.
 */
angular.module('mediosSuciosFrontApp')
  .service('msApiService', function(Restangular) {

    this.Report = Restangular.all('report');

    this.submitReport = function(report) {
      return this.Report.post(report);
    };

    this.getReports = function(query) {
      var defaults = { sort: 'createdAt DESC' };
      angular.extend(defaults, query);
      return this.Report.getList(defaults);
    };

  });
