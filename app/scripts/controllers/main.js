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
    vm.toggleSidenav = toggleSidenav;
    vm.setupCharts = setupCharts;

    vm.mediaData = {};
    vm.datesData = {};
    vm.reasonsData = {};
    vm.init();


    function getReports() {
      vm.loadingReports = true;
      return msApiService.getReports().then(vm.setReports);
    }

    function init() {
      vm.getReports();
      vm.setupCharts();
      vm.motives = [
        { title: 'Étnia' },
        { title: 'Nacionalidad' },
        { title: 'Clase' },
        { title: 'Género' },
        { title: 'Religión' },
        { title: 'Orientación Sexual' },
        { title: 'Discapacidad' }
      ];
    }

    function setReports(reports) {
      vm.loadingReports = false;
      vm.reports = reports.map(function(report) {
        console.log(report);
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
          vm.toggleSidenav();
          vm.getReports();
        });
    }

    function toggleSidenav() {
      $mdSidenav('left').toggle();
    }

    function setupCharts(){

      vm.mediaData.labels = ['El universal', 'La nacion',  'La jornada', 'La prensa'];
      vm.mediaData.series = ['Series A'];

      vm.mediaData.data = [
        [65, 59, 80, 81, 56, 55, 40]
      ];


      vm.datesData.labels = ["January", "February", "March", "April", "May", "June", "July"];
      vm.datesData.series = ['Series A'];
      vm.datesData.data = [
        [65, 59, 80, 81, 56, 55, 40]
      ];
      //vm.datesData.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      vm.datesData.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      };

      vm.reasonsData.labels = ['Sexismo', 'Racismo','Religioso', 'Homofobia'];
      vm.reasonsData.series = ['Series A'];

      vm.reasonsData.data = [
        [65, 59, 80, 81, 56, 55, 40]
      ];


    }


  });
