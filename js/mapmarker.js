/*
 * MapMarker
 *
 * @author L.Rosselli
 *
 */

function MapMarker(position, googleMap, message) {
	// position expected as google.maps.LatLng object
	// e.g. google.maps.LatLng(-25.363882,131.044922);
	var _position = position;
	var _map = googleMap;
	var _message = message;
	
	/*
		var marker = new google.maps.Marker({
		    position: myLatlng,
		    map: map,
		    title:"Hello World!"
		});
	
	var shape = { coord: [1, 1, 1, 23, 25, 23, 25 , 1],
			type: 'poly'
	};

	// propagate Google Maps markers and info windows
	this.origMarker = new google.maps.Marker({
		position: origLatLng,
		map: map,
		icon: img,
		shape: shape,
		animation: google.maps.Animation.DROP,
		title: origStop.stop
	})
		
	*/
	
	var markUserLocation = function() {
		if (_map & _position) {
			 
		}
	}
	
	return {
		
	}
}