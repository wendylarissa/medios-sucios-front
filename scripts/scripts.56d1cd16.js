"use strict";angular.module("mediosSuciosFrontApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial","restangular","ngSails"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]).config(["RestangularProvider",function(a){a.setBaseUrl("http://medios-sucios-api.herokuapp.com/")}]).config(["$sailsProvider",function(a){a.url="http://medios-sucios-api.herokuapp.com"}]),angular.module("mediosSuciosFrontApp").controller("MainCtrl",["msApiService","metadataService",function(a,b){function c(){g.getReports(),g.motives=[{title:"Racismo"},{title:"Discriminación"},{title:"Sexismo"},{title:"motivo2"},{title:"Motivo3"},{title:"Motivo4"},{title:"Motivo6"}]}function d(){return a.getReports().then(g.setReports)}function e(a){return g.reports=a.body.map(function(a){return a.info=b.getBasicInfo(a.metadata),a}),g.reports}function f(){g.reporting=!0,a.submitReport(g.report).then(function(a){g.reporting=!1,g.metadata=a,g.getReports()})}var g=this;g.report={},g.reporting=!1,g.reports=[],g.init=c,g.getReports=d,g.setReports=e,g.submitReport=f,g.init()}]),angular.module("mediosSuciosFrontApp").service("metadataService",function(){this.getBasicInfo=function(a){var b={title:a.general.title,description:a.general.description};return a.openGraph&&(b.title=a.openGraph.title,b.description=a.openGraph.description,a.openGraph.image&&(b.image=a.openGraph.image.url)),b}}),angular.module("mediosSuciosFrontApp").run(["$templateCache",function(a){a.put("views/gridlist.html",'<md-grid-list md-cols="1" md-cols-sm="2" md-cols-md="3" md-cols-gt-md="6" md-row-height-gt-md="1:1" md-row-height="4:3" md-gutter="8px" md-gutter-gt-sm="4px"> <md-grid-tile ng-repeat="tile in vm.tiles" md-rowspan="{{tile.span.row}}" md-colspan="{{tile.span.col}}" md-colspan-sm="1" md-colspan-xs="1" ng-class="tile.background"> <md-icon md-svg-icon="{{tile.icon}}"></md-icon> <md-grid-tile-footer> <h3>{{tile.title}}</h3></md-grid-tile-footer> </md-grid-tile> </md-grid-list>'),a.put("views/main.html",'<md-toolbar layout="row" class="md-toolbar-tools"> <h1>Medios Sucios</h1> </md-toolbar> <div flex layout="row"> <ng-include src="&quot;views/sidenav.html&quot;"></ng-include> <md-content flex id="content" class="md-padding"> <md-list flex> <md-list-item class="md-3-line md-long-text report" ng-repeat="report in vm.reports"> <img ng-src="{{report.info.image}}" ng-alt="{{report.info.title}}" class="report-image"> <div class="md-list-item-text md-padding"> <h3><a ng-href="{{report.link}}">{{ report.info.title }}</a></h3> <h4>{{report.source.domain}}</h4> <p> {{report.info.description}} </p> </div> </md-list-item> </md-list> </md-content> </div>'),a.put("views/sidenav.html",'<md-sidenav md-component-id="left" class="md-sidenav-left md-padding" md-is-locked-open="$mdMedia(\'gt-md\')"> <md-input-container> <label>URL de el Articulo</label> <input ng-model="vm.report.url" ng-disabled="vm.reporting"> </md-input-container> <md-select ng-model="vm.report.motive" ng-disabled="vm.reporting"> <md-option ng-repeat="motive in vm.motives" value="{{motive.title}}"> {{motive.title}} </md-option> </md-select> <md-input-container class="md-block"> <label>Comentario</label> <textarea ng-model="vm.report.coment" ng-disabled="vm.reporting" md-maxlength="256" rows="4" md-select-on-focus></textarea> </md-input-container> <md-button class="md-primary md-raised" ng-if="!vm.reporting" ng-click="vm.submitReport()">Reportar</md-button> <md-progress-circular ng-if="vm.reporting" md-mode="indeterminate"></md-progress-circular> </md-sidenav>')}]);