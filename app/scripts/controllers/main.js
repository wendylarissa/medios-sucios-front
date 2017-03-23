'use strict';

/**
 * @ngdoc function
 * @name mediosSuciosFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mediosSuciosFrontApp
 */
angular.module('mediosSuciosFrontApp')
  .controller('MainCtrl', function(msApiService, metadataService, $mdSidenav) {

    var vm = this;

    vm.loadingReports = false;
    vm.report = {};
    vm.reporting = false;
    vm.reports = [];

    vm.getReports = getReports;
    vm.init = init;
    vm.setReports = setReports;
    vm.submitReport = submitReport;
    vm.toggleSidenav = toggleSidenav();
    vm.init();


    function getReports() {
      vm.loadingReports = true;
      return msApiService.getReports().then(vm.setReports);
    }

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



    function setReports(reports) {
      vm.loadingReports = false;
      vm.reports = reports.map(function(report) {
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

    function toggleSidenav() {
      return function() {
      console.log('toggling');
        $mdSidenav('left').toggle();
      };
    }


  });
