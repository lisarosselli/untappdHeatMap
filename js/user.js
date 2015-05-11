/*
 * User
 *
 * @author L.Rosselli
 */

function User() {
	var _location = {
		lat: null,
		lng: null
	};
	
	var getGoogleLatLng = function() {
		if (google.maps) {
			return new google.maps.LatLng(_location.lat, _location.lng);
		}
	};
	
	return {
		location: _location,
		getGoogleLatLng: getGoogleLatLng
	};
}