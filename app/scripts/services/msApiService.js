'use strict';

/**
 * @ngdoc service
 * @name mediosSuciosFrontApp.ctbookApi
 * @description
 * # ctbookApi
 * Service in the mediosSuciosFrontApp.
 */
angular.module('mediosSuciosFrontApp')
  .service('msApiService', function(Restangular, $sails) {

    this.Report = Restangular.all('report');

    this.submitReport = function(report) {
      return this.Report.post(report);
    };

    this.getReports = function(query) {
      var defaults = { sort: 'createdAt DESC' };
      angular.extend(defaults, query);
      return $sails.get('/report', defaults);
    };

  });
