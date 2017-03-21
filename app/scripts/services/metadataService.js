'use strict';

/**
 * @ngdoc service
 * @name mediosSuciosFrontApp.metadataService
 * @description
 * # metadataService
 * Service in the mediosSuciosFrontApp.
 */
angular.module('mediosSuciosFrontApp')
  .service('metadataService', function() {

  	this.getBasicInfo = function(metadata){
  		var info = {
  			title : metadata.general.title,
  			description : metadata.general.description
  		};
  		if(metadata.openGraph){
  			info.title = metadata.openGraph.title;
  			info.description = metadata.openGraph.description;
  			if(metadata.openGraph.image){
  				info.image = metadata.openGraph.image.url;
  			}
  		}
  		return info;
  	};
    
  });
