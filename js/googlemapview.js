/*
 * GoogleMapsView
 *
 * @author L.Rosselli
 * 
 */

function GoogleMapsView() {
	console.log('GoogleMapsView');
	
	var _map;
	var _markers = [];

	var init = function() {
		if (!_map) {
			var mapOptions = { zoom: 16 };
			_map = new google.maps.Map(app.model.mapCanvasElement, mapOptions);
			console.log(_map);
		}
		return _map;
	}
	
	/*
	 * This method acts to intake a marker and store
	 * it in the _markers array for future use or disposal.
	 * Position expected as google.maps.LatLng object
	 * e.g. google.maps.LatLng(-25.363882,131.044922);
	 */
	var markUserLocation = function(positionParam, titleParam) {
		if (_map && positionParam && titleParam) {
			
			var shape = { 
					coord: [0,0,150,75],
					type: 'rect'
			};
			
			var marker = new google.maps.Marker({
				animation: google.maps.Animation.DROP,
				position: positionParam,
				map: _map,
				shape: shape,
				title: titleParam
			});
			_markers.push(marker);
		} else {
			throw(new Error('Missing a parameter.'));
		}
	}
	
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
	
	return {
		init: init,
		markUserLocation: markUserLocation,
		get map() {
			return _map;
		}
	}
}