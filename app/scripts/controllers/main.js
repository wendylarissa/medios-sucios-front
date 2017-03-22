'use strict';

/**
 * @ngdoc function
 * @name mediosSuciosFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mediosSuciosFrontApp
 */
angular.module('mediosSuciosFrontApp')
  .controller('MainCtrl', function(msApiService, metadataService) {

    var vm = this;

    vm.report = {};
    vm.reporting = false;
    vm.reports = [];

    vm.init = init;
    vm.getReports = getReports;
    vm.setReports = setReports;
    vm.submitReport = submitReport;

    vm.init();

    function init() {
      vm.getReports();
      vm.motives = [
        { title: 'Racismo' },
        { title: 'Discriminación' },
        { title: 'Sexismo' },
        { title: 'motivo2' },
        { title: 'Motivo3' },
        { title: 'Motivo4' },
        { title: 'Motivo6' }
      ];
    }

    function getReports() {
      return msApiService.getReports().then(vm.setReports);
    }

    function setReports(res) {
      vm.reports = res.body.map(function(report) {
        report.info = metadataService.getBasicInfo(report.metadata);
        return report;
      });
      return vm.reports;
    }

    function submitReport() {
      vm.reporting = true;
      msApiService.submitReport(vm.report)
        .then(function(report) {
          vm.reporting = false;
          vm.metadata = report;
          vm.getReports();
        });
    }


  });
