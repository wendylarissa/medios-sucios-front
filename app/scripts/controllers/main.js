'use strict';

/**
 * @ngdoc function
 * @name mediosSuciosFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mediosSuciosFrontApp
 */
angular.module('mediosSuciosFrontApp')
  .controller('MainCtrl', function(msApiService, metadataService, $mdSidenav, $filter,prismicService) {

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

      prismicService.getAll().then(function(res){
        vm.pages = res.data.results;
        console.log(vm.pages);
      });

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
          vm.toggleSidenav();
          vm.getReports();
        });
    }

    function toggleSidenav() {
      $mdSidenav('left').toggle();
    }

    function setupCharts(){

      msApiService.getSourceCount()
        .then(function(res){
          //console.log(res);
          var sourceCountReport = res.data;

          vm.sourceData = sourceCountReport.reduce(function(acum,source){
            var aux = {
              labels: (acum.labels) ? acum.labels.concat(source._id) : [source._id],
              data: (acum.data) ? acum.data.concat(source.total) : [source.total]            
            };
            return aux;
          }, {});

          vm.sourceData.options = {
            scales:{
              yAxes:[
                {
                  ticks:{beginAtZero:true}
                }
              ]
            }
          };
          //console.log('vm.mediaData', vm.mediaData);
      })
      .catch(function(err){
        console.log(err);
      });


      msApiService.getMotiveCount()
        .then(function(res){
          var motiveCountReport = res.data;

          vm.motiveData = motiveCountReport.reduce(function(acum,source){
            var aux = {
              labels: (acum.labels) ? acum.labels.concat(source._id) : [source._id],
              data: (acum.data) ? acum.data.concat(source.total) : [source.total]            
            };
            return aux;
          }, {});

          vm.motiveData.options = {
            scales:{
              yAxes:[
                {
                  ticks:{beginAtZero:true}
                }
              ]
            }
          };
      })
      .catch(function(err){
        console.log(err);
      });


      msApiService.getDateReportCount()
        .then(function(res){
         // console.log(res);
          var dateCountReport = res.data;

          vm.dateData = dateCountReport.reduce(function(acum,source){

            var monthDate = moment(source._id, 'MM').toDate();
            var monthName = $filter('date')(monthDate, 'MMMM');
            var aux = {
              labels: (acum.labels) ? acum.labels.concat(monthName) : [monthName],
              data: (acum.data) ? acum.data.concat(source.total) : [source.total]            
            };
            return aux;
          }, {});

      })
      .catch(function(err){
        console.log(err);
      });

      //var formattedMonth = moment('09', 'MM').format('MMMM');
        /*
      vm.mediaData.labels = ['El universal', 'La nacion',  'La jornada', 'La prensa'];
      vm.mediaData.series = ['Series A'];

      vm.mediaData.data = [
        [65, 59, 80, 81, 56, 55, 40]
      ];
      */


      vm.datesData.labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];
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
