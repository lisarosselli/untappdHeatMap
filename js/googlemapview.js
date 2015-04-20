/*
 * GoogleMapsView
 *
 * @author L.Rosselli
 * 
 */

function GoogleMapsView() {
	console.log('GoogleMapsView');
	
	var _map;

	var init = function() {
		if (!_map) {
			var mapOptions = { zoom: 16 };
			_map = new google.maps.Map(app.model.mapCanvasElement, mapOptions);
			console.log(_map);
		}
		return _map;
	}
	
	return {
		init: init,
		get map() {
			return _map;
		}
	}
}