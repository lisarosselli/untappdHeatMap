/*
 * Controller
 *
 * @author L.Rosselli
 * 
 */

'use strict';

function Controller() {
	
	
	/*
	 * acquireLocation
	 */
	var acquireLocation = function() {
		app.view.mainUIView.showLocationLoader();
		app.view.googleMapsView.init();
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log(position.coords);
					
					// store the values to the model					
					app.model.user.location.lat = position.coords.latitude;
					app.model.user.location.lng = position.coords.longitude;
					
					// set the map to center on location
					app.view.googleMapsView.map.setCenter({ lat: app.model.user.location.lat, lng: app.model.user.location.lng});	
					app.model.geoSuccess = true;			
					
					app.view.mainUIView.removeLocationLoader();
					displayUserMarker();
					resetMapCenter();
				}, 
				function(error) {
					console.log(error);
					app.view.mainUIView.removeLocationLoader();
					var div = dataParse.createGeoLocFailMessage(error);
					app.view.mainUIView.fadeInModal(div);
					app.model.geoSuccess = false;	
					return error;
				}, 
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0
				});
		} else {
			console.log('No browser support for geolocation.');
			app.view.mainUIView.removeLocationLoader();
			var div = dataParse.createGeoLocDeniedMessage();
			app.view.mainUIView.fadeInModal(div);
			app.model.geoSuccess = false;	
		}
	};
	
	/*
	 * displayUserMarker
	 */
	var displayUserMarker = function() {
		app.view.googleMapsView.markUserLocation(app.model.user.getGoogleLatLng(), 'I am here.');
	};

	var resetMapCenter = function() {
		app.view.googleMapsView.resetMapCenter();
	};
	
	/*
	 * getLocalPubData
	 */
	var getLocalPubData = function(callback) {
		var ajaxUrl;
		
		if (!app.model.user.location.lat || !app.model.user.location.lng) {
			console.warn('getLocalPubData > using Chicago Loop default location');
			ajaxUrl = 'https://api.untappd.com/v4/thepub/local?access_token=A3DF816D42AA28B509413D4903139E8650A2B5C4&lat=41.8854785&lng=-87.6402523';
		} else {
			console.debug('getLocalPubData > using Google generated lat/lng');
			ajaxUrl = app.model.untappdApi.getPubsUri(app.model.user.location.lat, app.model.user.location.lng);
		}
		
		app.view.mainUIView.toggleCheckinsLoadIcon();
		
		$.ajax({
			url: ajaxUrl,
		})
			.done(function(data) {
				app.model.pubsResponse = data;
				console.log("ajax successful");
				app.model.heatMapData = dataParse.getLatLngArray(data);
				app.model.googleMVCArray = new google.maps.MVCArray(app.model.heatMapData);
				app.view.mainUIView.toggleCheckinsLoadIcon();
				if (callback) {
					callback();
				}
			})
			.fail(function(data) {
				console.log("ajax failed");
				console.log(data);
				app.view.mainUIView.toggleCheckinsLoadIcon();
			});
	};

	var displayHeatMap = function() {
		app.view.googleMapsView.displayHeatMap();
		var venueCheckinArray = [];
		venueCheckinArray = dataParse.groupCheckinDataByVenue(app.model.pubsResponse);
		app.view.googleMapsView.displayCheckinsByVenue(venueCheckinArray);
	};

	var getBeerInfo = function(beerId) {
		var ajaxUrl = app.model.untappdApi.getBeerInfoUri(beerId);
		console.log(ajaxUrl);
		
		
		$.ajax({
			url: ajaxUrl,
		})
			.done(function(data) {
				console.log('beer info ajax successful');
				var div = dataParse.createBeerInfoDisplay(data);
				app.view.mainUIView.fadeInModal(div);
			})
			.fail(function(data) {
				console.log('beer info ajax fail');
				console.log(data);
			});
	};

	return {
		acquireLocation: acquireLocation,
		displayUserMarker: displayUserMarker,
		getLocalPubData: getLocalPubData,
		displayHeatMap: displayHeatMap,
		getBeerInfo: getBeerInfo
	};
}