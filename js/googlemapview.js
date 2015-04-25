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
			console.log('GoogleMapsView init '+_map);
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
			var infoWindow;
			var marker;
			
			marker = new google.maps.Marker({
				animation: google.maps.Animation.DROP,
				position: positionParam,
				map: _map,
				title: titleParam
			});
			
			infoWindow = new google.maps.InfoWindow();
			infoWindow.setContent('Here for the beer.');
			infoWindow.open(_map, marker);
			
			_markers.push(marker);
			
		} else {
			throw(new Error('Missing a parameter.'));
		}
	}
	
	return {
		init: init,
		markUserLocation: markUserLocation,
		get map() {
			return _map;
		}
	}
}