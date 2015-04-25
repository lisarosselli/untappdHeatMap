/*
 * Model
 *
 * @author L.Rosselli
 * 
 */

function Model() {
	var _untappdApi;
	var _user = new User();
	var _geoSuccess = false;
	var _pubsResponse;
	
	var setUntappdApi = function(value) {
		if (!_untappedApi) {
			_untappedApi = value;
		}
	}
	
	/*
	 	local pub response
		var checkins = app.model.pubsResponse.response.checkins; (25)
		checkins.items[n].
					beer
					brewery
					checkin_comment
					created_at
					user
					venue
	
	*/
	
	
	return {
		get untappdApi() {
			return _untappdApi;
		},
		set untappdApi(value) {
			_untappdApi = value;
		},
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
		},
		get pubsResponse() {
			return _pubsResponse;
		},
		set pubsResponse(value) {
			_pubsResponse = value;
		}
	}
}