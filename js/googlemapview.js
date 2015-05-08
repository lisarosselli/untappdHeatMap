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
			var mapOptions = { zoom: 15 };
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
		clearVenueMarkers();
		
		_.each(data, function(v, k, l) {
			var marker;
			var infoWindow;
			var containerDiv = document.createElement('div');
			
			containerDiv.className = 'venueWindow';
			
			// create headline
			var header = document.createElement('h4');
			var checkinText = (v.length > 1) ? ' Check-ins at ' : ' Check-in at ';
			header.textContent = v.length + checkinText + v[0].venue.venue_name;
			containerDiv.appendChild(header);
			
			// amalgamate individual beer checkins per venue
			for (var i = 0; i < v.length; i++) {
				var beerEntry = document.createElement('div');
				beerEntry.className = 'beerCheckin';
				
				var beerImg = document.createElement('div');
				beerImg.className = 'beerImg';
				
				var beerTag = document.createElement('div');
				beerTag.className = 'beerTag';
			
				var img = document.createElement('img');
				img.src = v[i].beer.beer_label;
			
				var h5 = document.createElement('h5');
				h5.innerHTML = v[i].beer.beer_name + ', ' + 
												v[i].beer.beer_abv + '% ABV' + '<br>' +
												'<small>'+ v[i].brewery.brewery_name + 
												'</small>';
												
				var btn = document.createElement('button');
				btn.textContent = 'More info...';
				btn.setAttribute('data-id', v[i].beer.bid);
				btn.setAttribute('class', 'moreInfo btn btn-link');
				
				$(btn).click(function() {
					console.log(this.dataset.id);
					app.controller.getBeerInfo(this.dataset.id);
				});
				
				beerEntry.appendChild(beerImg);
					beerImg.appendChild(img);
				beerEntry.appendChild(beerTag);
					beerTag.appendChild(h5);
					beerTag.appendChild(btn);
				containerDiv.appendChild(beerEntry);
			}
			
			// setting a custom icon, a circle
			// then setting opacity to 0 to allow viewing
			// of the heatmap underneath
			marker = new google.maps.Marker({
				id: k,
				animation: google.maps.Animation.DROP,
				clickable: true,
				isOpen: false,
				icon: {
					fillColor: "#BB2B44",
					fillOpacity: 0,
					strokeColor: "#f4953b",
					strokeOpacity: 0,
					scale: 17,
					path: google.maps.SymbolPath.CIRCLE
				},
				position: new google.maps.LatLng(v[0].venue.location.lat, v[0].venue.location.lng),
				map: _map
			});
			
			_markers.push(marker);

			infoWindow = new google.maps.InfoWindow({
				id: k,
				clickable: true,
				content: containerDiv,
				maxWidth: 250,
				position: new google.maps.LatLng(v[0].venue.location.lat, v[0].venue.location.lng)
			});
	
			//infoWindow.open(_map, marker);
			_infoWindows.push(infoWindow);
		});
		
		setupInfoWindowClose(_markers, _infoWindows);
		setupMarkerClickEvents(_markers, _infoWindows);
	}
	
	var clearVenueMarkers = function() {
		_markers = [];
		_infoWindows = [];
	}
	
	/*
	 * @param array of google.maps.Marker objects
	 * @param array of google.maps.InfoWindow objects
	 */
	var setupInfoWindowClose = function(markerArray, infoWindowArray) {
		_.each(infoWindowArray, function(element, index, list) {
			element.addListener('closeclick', function() {
				var t = this;
				var marker = _.find(markerArray, function(m) {
					return m.id == t.id;
				});
				marker.isOpen = false;
			});
		});
	}
	
	/*
	 * @param array of google.maps.Marker objects
	 * @param array of google.maps.InfoWindow objects
	 */
	var setupMarkerClickEvents = function(markerArray, infoWindowArray) {
		_.each(markerArray, function(element, index, list) {
			element.addListener('click', function() {
				// find this marker's matching infoWindow
				// and display it
				if (!this.isOpen) {
					var t = this;
					var infoWindow = _.find(infoWindowArray, function(w) {
						return w.id == t.id;
					});
					
					if (infoWindow) {
						infoWindow.open(_map, this);
					};
					
					this.isOpen = true;
				} 
			});
		});
	}
	
	return {
		init: init,
		markUserLocation: markUserLocation,
		get map() {
			return _map;
		},
		get markers() {
			return _markers;
		},
		get infoWindows() {
			return _infoWindows;
		},
		resetMapCenter: resetMapCenter,
		displayHeatMap: displayHeatMap,
		removeHeatMap: removeHeatMap,
		displayCheckinsByVenue: displayCheckinsByVenue
	}
}