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
		app.view.init();
		
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
					alert(error.message + '\nThe point of this app is totally moot if we cannot locate you.');
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
	
	var displayUserMarker = function() {
		app.view.googleMapsView.markUserLocation(app.model.user.getGoogleLatLng(), 'I am here.');
	}
	
	var getLocalPubData = function() {
		$.ajax({
			url: app.model.untappdApi.getPubsUri(app.model.user.location.lat, app.model.user.location.lng),
		})
			.done(function(data) {
				app.model.pubsResponse = data;
				console.log("ajax successful");
			})
			.fail(function(data) {
				console.log("ajax failed");
			});
	}

	return {
		acquireLocation: acquireLocation,
		displayUserMarker: displayUserMarker,
		getLocalPubData: getLocalPubData
	}
	
}