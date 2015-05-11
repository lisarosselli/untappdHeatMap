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
										 	'Rated: ' + data.response.beer.rating_score + ' / 5.0';		
														
		h4b.innerHTML = 	'<img style=\'height:40px;\' src=\'' + data.response.beer.brewery.brewery_label + '\'>&nbsp;' +
											'<a href=\'' + data.response.beer.brewery.contact.url +'\' target=\'blank\'>' +
											data.response.beer.brewery.brewery_name + '</a>';
											
		p.textContent = (data.response.beer.beer_description != "") ? 
											data.response.beer.beer_description : 
											'No beer description (yet) for ' + data.response.beer.beer_name + '.';
											
		return div;
	},
	
	createGeoLocDeniedMessage: function() {
		var div 	= document.createElement('div');
		var h3 		= document.createElement('h3');
		var p 		= document.createElement('p');
		
		div.appendChild(h3);
		div.appendChild(p);
		h3.textContent = 'Your browser is not allowing Geolocation right now.';
		p.textContent = 'Sadness ensues...';
		
		return div;
	},
	
	createGeoLocFailMessage: function(errorMessage) {
		var div 	= document.createElement('div');
		var h3 		= document.createElement('h3');
		
		div.appendChild(h3);
		h3.textContent = errorMessage.message;
		
		return div;
	}
}