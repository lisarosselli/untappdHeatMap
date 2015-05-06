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
	var _infoWindows = [];
	var _heatmap;

	var init = function() {
		if (!_map) {
			var mapOptions = { zoom: 14 };
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
			//infoWindow.setContent('<h1>Hello World</h1><h6>something else</h6><img src="https://d1c8v1qci5en44.cloudfront.net/site/brewery_logos/brewery-129756_5cf76.jpeg">');
			infoWindow.open(_map, marker);
			_markers.push(marker);

			resetMapCenter();

		} else {
			throw(new Error('Missing a parameter.'));
		}
	}

	var resetMapCenter = function() {
		if (_map && app.model.user.getGoogleLatLng()) {
			_map.setCenter(app.model.user.getGoogleLatLng());
			console.log('reset center');
		}
	}

	var displayHeatMap = function() {
		if (app.model.googleMVCArray) {
			_heatmap = new google.maps.visualization.HeatmapLayer({
			    data: app.model.googleMVCArray,
			    opacity: 0.7,
			    radius: 40
			  });
			_heatmap.setMap(_map);
		}
	}

	var removeHeatMap = function() {
		if (_heatmap) {
			_heatmap.setMap(null);
		}
	}
	
	/*
	 * @param venueData array
	 */
	var displayCheckinsByVenue = function(data) {
		debugger;
		
		_.each(data, function(v, k, l) {
			console.log(v);

			var marker;
			var infoWindow;
			var containerDiv = document.createElement('div');
			containerDiv.className = 'venueWindow';
			
			for (var i = 0; i < v.length; i++) {
				var beerEntry = document.createElement('div');
				beerEntry.className = 'beerCheckin';
			
				var img = document.createElement('img');
				img.src = v[i].beer.beer_label;
			
				var h6 = document.createElement('h6');
				
				var span = document.createElement('span');
				span.className = 'brewery';
				span.textContent = v[i].brewery.brewery_name;
				h6.textContent = v[i].beer.beer_name + span + v[i].beer.beer_abv + '% ABV';
				
				beerEntry.appendChild(img);
				beerEntry.appendChild(h6);
				containerDiv.appendChild(beerEntry);
			}
			
			marker = new google.maps.Marker({
				localId: k,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(v[0].venue.location.lat, v[0].venue.location.lng),
				map: _map
			});
			
			_markers.push(marker);
			
			console.log(marker);
			
			
			//console.log(containerDiv);
			

			infoWindow = new google.maps.InfoWindow({
				localId: k,
				content: containerDiv,
				maxWidth: 250,
				position: new google.maps.LatLng(v[0].venue.location.lat, v[0].venue.location.lng),
				title: v.length + ' Checkins @' + v[0].venue.venue_name
			});
	
			infoWindow.open(_map, marker);
			_infoWindows.push(infoWindow);
			//infoWindow.setContent(containerDiv);
			//infoWindow.open(_map, marker);
			//_markers.push(marker);

			
		})
		
		/*
		for (var i = 0; i < data.length; i++) {
			var marker;
			var infoWindow;
			var thisVenue = data[i];
			var containerDiv = document.createElement('div');
			containerDiv.className = 'venueWindow';
			
			for (var a = 0; a < thisVenue.length; a++) {
				var beerEntry = document.createElement('div');
				beerEntry.className = 'beerCheckin';
			
				var img = document.createElement('img');
				img.src = thisVenue[a].beer.beer_label;
			
				var h6 = document.createElement('h6');
				h6.textContent = thisVenue[a].beer.beer_name + 
								'<span class=\'brewery\'>' + thisVenue[a].brewery.brewery_name + '</span>' +
								thisVenue[a].beer.beer_abv + '% ABV';
				beerEntry.appendChild(img);
				beerEntry.appendChild(h6);
				containerDiv.appendChild(beerEntry);
			}
			
			marker = new google.maps.Marker({
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(thisVenue[0].venue.location.lat, thisVenue[0].venue.location.lng),
				map: _map
			});
			
			infoWindow = new google.maps.InfoWindow();
			infoWindow.setContent(containerDiv);
			infoWindow.open(_map, marker);
			_markers.push(marker);
		}
		*/
		
	}
	
	return {
		init: init,
		markUserLocation: markUserLocation,
		get map() {
			return _map;
		},
		resetMapCenter: resetMapCenter,
		displayHeatMap: displayHeatMap,
		removeHeatMap: removeHeatMap,
		displayCheckinsByVenue: displayCheckinsByVenue
	}
}