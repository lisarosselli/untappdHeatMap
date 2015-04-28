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
		
		app.model.pubsResponse.response.checkins.items[n].venue = {}
		app.model.pubsResponse.response.checkins.items[0].venue.location.lat
		app.model.pubsResponse.response.checkins.items[0].venue.location.lng
		app.model.pubsResponse.response.checkins.items[0].venue.location.venue_address
		app.model.pubsResponse.response.checkins.items[0].venue.location.venue_city
		app.model.pubsResponse.response.checkins.items[0].venue.venue_name
	
		app.model.pubsResponse.response.checkins.items[0].beer = {}
		app.model.pubsResponse.response.checkins.items[0].beer.beer_name
		app.model.pubsResponse.response.checkins.items[0].beer.beer_abv
		app.model.pubsResponse.response.checkins.items[0].beer.beer_ibu
		app.model.pubsResponse.response.checkins.items[0].beer.beer_style
	
		
		app.model.pubsResponse.response.checkins.items[0].brewery.brewery_name
		app.model.pubsResponse.response.checkins.items[0].brewery.brewery_label (jpeg)
	
		map.data.addGeoJson(results) results are JSON
		the map.data object is a collection of Features (google.maps.Data.Feature)
	
		var a = new google.maps.Data.Feature( options...);
		{
			geometry: sdfas,
		 	id: you set this,
			properties: {
				}
		}
	
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