/*
 * Model
 *
 * @author L.Rosselli
 * 
 */

function Model() {
	var _untappedApi;
	var _user = new User();
	var _geoSuccess = false;
	
	var setUntappdApi = function(value) {
		if (!_untappedApi) {
			_untappedApi = value;
		}
	}
	
	return {
		setUntappdApi: setUntappdApi,
		user: _user,
		get mapCanvasElement() {
			return document.getElementById('map-canvas');
		},
		get mainContainerElement() {
			return document.getElementById('mainContainer');
		},
		get geoSuccess() {
			return _geoSuccess;
		},
		set geoSuccess(value) {
			if (typeof value == 'boolean') {
				_geoSuccess = value;
			}
		}
	}
}