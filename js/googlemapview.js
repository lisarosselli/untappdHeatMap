/*
 * GoogleMapsView
 *
 * @author L.Rosselli
 * 
 */

function GoogleMapsView() {
	console.log('GoogleMapsView');
	
	var _map;
	var _mapElement;

	var init = function() {
		if (!_mapElement) {
			_mapElement = document.createElement('div');
			_mapElement.setAttribute('id', 'map-canvas');
			_map = new google.maps.Map(_mapElement, {zoom:15});
			console.log(_map);
		}
		return _mapElement;
	}

	
	return {
		init: init,
		map: _map
	}
}