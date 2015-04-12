/*
 * Model
 *
 * @author L.Rosselli
 * 
 */

function Model() {
	var _untappedApi;
	
	var setUntappdApi = function(value) {
		if (!_untappedApi) {
			_untappedApi = value;
		}
	}
	
	return {
		setUntappdApi: setUntappdApi
	}
}