/*
 * Controller
 *
 * @author L.Rosselli
 * 
 */

function Controller() {
	
	
	/*
	 * acquireLocation
	 */
	var acquireLocation = function() {
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
					
					displayUserMarker();
				}, 
				function(error) {
					console.log(error);
					//alert(error.message + '\nThe point of this app is totally moot if we cannot locate you.');
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
			alert('No browser support for geolocation.');
			app.model.geoSuccess = false;	
		}
	}
	
	/*
	 * displayUserMarker
	 */
	var displayUserMarker = function() {
		app.view.googleMapsView.markUserLocation(app.model.user.getGoogleLatLng(), 'I am here.');
	}

	var resetMapCenter = function() {
		app.view.googleMapsView.resetMapCenter();
	}
	
	/*
	 * getLocalPubData
	 */
	var getLocalPubData = function(callback) {
		var ajaxUrl;
		
		if (!app.model.user.location.lat || !app.model.user.location.lng) {
			console.warn('getLocalPubData > using Chicago Loop default location');
			ajaxUrl = 'https://api.untappd.com/v4/thepub/local?access_token=A3DF816D42AA28B509413D4903139E8650A2B5C4&lat=41.8854785&lng=-87.6402523';
		} else {
			// hit the API for local checkins (public users)
			console.debug('getLocalPubData > using Google generated lat/lng');
			ajaxUrl = app.model.untappdApi.getPubsUri(app.model.user.location.lat, app.model.user.location.lng);
		}
		
		$.ajax({
			url: ajaxUrl,
		})
			.done(function(data) {
				app.model.pubsResponse = data;
				console.log("ajax successful");
				app.model.heatMapData = dataParse.getLatLngArray(data);
				app.model.googleMVCArray = new google.maps.MVCArray(app.model.heatMapData);
				if (callback) {
					callback();
				}
			})
			.fail(function(data) {
				console.log("ajax failed");
			});
	}

	var displayHeatMap = function() {
		app.view.googleMapsView.displayHeatMap();
		var venueCheckinArray = new Array();
		venueCheckinArray = dataParse.groupCheckinDataByVenue(app.model.pubsResponse);
		app.view.googleMapsView.displayCheckinsByVenue(venueCheckinArray);
	}

  // maybe this is now moot?
	// doing this in one fell swoop 
	/*
	var displayCheckinsByVenue = function() {
		if (app.model.pubsResponse) {
			completeDisplayCheckinsByVenue();
		} else {
			getLocalPubData(completeDisplayCheckinsByVenue);
		}
	}
	
	var completeDisplayCheckinsByVenue = function() {
		var venueCheckinArray = new Array();
		venueCheckinArray = dataParse.groupCheckinDataByVenue(app.model.pubsResponse);
		app.view.googleMapsView.displayCheckinsByVenue(venueCheckinArray);
	}
	*/

	return {
		acquireLocation: acquireLocation,
		displayUserMarker: displayUserMarker,
		getLocalPubData: getLocalPubData,
		displayHeatMap: displayHeatMap
	}
	
}