var dataParse = {
	getLatLngArray: function(data) {
		var dataArray = new Array();
		var checkinItems = data.response.checkins.items;
		
		for (var i = 0; i < checkinItems.length; i++) {
			var thisLatLng = new google.maps.LatLng(
					checkinItems[i].venue.location.lat,
					checkinItems[i].venue.location.lng
				);
			dataArray.push(thisLatLng);
		}
		return dataArray;
	},
	
	groupCheckinDataByVenue: function(data) {
		var dataArray = new Array();
		dataArray = _.groupBy(data.response.checkins.items, function(checkinObj) {
			return checkinObj.venue.venue_id;
		});
		return dataArray;
	},
	
	truncateString: function(str, maxChars) {
		console.log(str);
		var truncatedStr = str.substr(0, maxChars-1);
		truncatedStr += "...";
		return truncatedStr;
	},
	
	createBeerInfoDisplay: function(data) {
		var div 	= document.createElement('div');
		var h3 		= document.createElement('h3');
		var h4a 	= document.createElement('h4');
		var h4b 	= document.createElement('h4');
		var p 		= document.createElement('p');
		
		div.appendChild(h3);
		div.appendChild(h4a);
		div.appendChild(h4b);
		div.appendChild(p);
		
		h3.textContent 	= data.response.beer.beer_name;
		h4a.innerHTML  	= data.response.beer.beer_style + '<br>' +
										 	data.response.beer.beer_abv + '% ABV' + '<br>' +
										 	data.response.beer.beer_ibu + ' IBU' + '<br>' +
										 	data.response.beer.rating_score + '/5.0';		
														
		h4b.innerHTML = '<a href=\'' + data.response.beer.brewery.contact.url +'\'>' +
											'<img style=\'height:37px;\' src=\'' + data.response.beer.brewery.brewery_label + '\'>&nbsp;' +
											data.response.beer.brewery.brewery_name + '</a>';
											
		p.textContent = (data.response.beer.beer_description != "") ? 
											data.response.beer.beer_description : 
											'No beer description (yet) for ' + data.response.beer.beer_name + '.';
											
		return div;
	}
}

/*
	3 check-ins here
	pull those checkins / have them in an object ready
*/

/*
		https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap

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