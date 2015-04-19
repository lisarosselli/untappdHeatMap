/*
 * Model
 *
 * @author L.Rosselli
 * 
 */

function Model() {
	var _untappedApi;
	var _user = new User();
	
	var setUntappdApi = function(value) {
		if (!_untappedApi) {
			_untappedApi = value;
		}
	}
	
	return {
		setUntappdApi: setUntappdApi,
		user: _user
	}
}