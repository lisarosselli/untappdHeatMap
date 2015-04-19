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
		// cue the map
		app.view.initMap();
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log(position.coords);
					
					// store the values to the model					
					app.model.user.location.lat = position.coords.latitude;
					app.model.user.location.lng = position.coords.longitude;

					
		      //var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
																					 
					//app.view.googleMapsView.map.setCenter(pos);														
				}, 
				function(error) {
					console.log(error);
					return error;
				}, 
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0
				});
		} else {
			console.log('no support for geolocation');
		}
	}
	

	return {
		acquireLocation: acquireLocation
	}
	
}