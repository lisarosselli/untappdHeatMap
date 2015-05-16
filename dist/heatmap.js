/*
 * Controller
 *
 * @author L.Rosselli
 * 
 */

'use strict';

function Controller() {
	
	
	/*
	 * acquireLocation
	 */
	var acquireLocation = function() {
		app.view.mainUIView.showLocationLoader();
		app.view.googleMapsView.init();
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log(position.coords);
					
					// store the values to the model					
					app.model.user.location.lat = position.coords.latitude;
					app.model.user.location.lng = position.coords.longitude;
					
					// set the map to center on location
					app.view.googleMapsView.map.setCenter({ lat: app.model.user.location.lat, lng: app.model.user.location.lng});	
					app.model.geoSuccess = true;			
					
					app.view.mainUIView.removeLocationLoader();
					displayUserMarker();
					resetMapCenter();
				}, 
				function(error) {
					console.log(error);
					app.view.mainUIView.removeLocationLoader();
					var div = dataParse.createGeoLocFailMessage(error);
					app.view.mainUIView.fadeInModal(div);
					app.model.geoSuccess = false;	
					return error;
				}, 
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0
				});
		} else {
			console.log('No browser support for geolocation.');
			app.view.mainUIView.removeLocationLoader();
			var div = dataParse.createGeoLocDeniedMessage();
			app.view.mainUIView.fadeInModal(div);
			app.model.geoSuccess = false;	
		}
	};
	
	/*
	 * displayUserMarker
	 */
	var displayUserMarker = function() {
		app.view.googleMapsView.markUserLocation(app.model.user.getGoogleLatLng(), 'I am here.');
	};

	var resetMapCenter = function() {
		app.view.googleMapsView.resetMapCenter();
	};
	
	/*
	 * getLocalPubData
	 */
	var getLocalPubData = function(callback) {
		var ajaxUrl;
		
		if (!app.model.user.location.lat || !app.model.user.location.lng) {
			console.warn('getLocalPubData > using Chicago Loop default location');
			ajaxUrl = 'https://api.untappd.com/v4/thepub/local?access_token=A3DF816D42AA28B509413D4903139E8650A2B5C4&lat=41.8854785&lng=-87.6402523';
		} else {
			console.debug('getLocalPubData > using Google generated lat/lng');
			ajaxUrl = app.model.untappdApi.getPubsUri(app.model.user.location.lat, app.model.user.location.lng);
		}
		
		app.view.mainUIView.toggleCheckinsLoadIcon();
		
		$.ajax({
			url: ajaxUrl,
		})
			.done(function(data) {
				app.model.pubsResponse = data;
				console.log("ajax successful");
				app.model.heatMapData = dataParse.getLatLngArray(data);
				app.model.googleMVCArray = new google.maps.MVCArray(app.model.heatMapData);
				app.view.mainUIView.toggleCheckinsLoadIcon();
				if (callback) {
					callback();
				}
			})
			.fail(function(data) {
				console.log("ajax failed");
				console.log(data);
				app.view.mainUIView.toggleCheckinsLoadIcon();
			});
	};

	var displayHeatMap = function() {
		app.view.googleMapsView.displayHeatMap();
		var venueCheckinArray = [];
		venueCheckinArray = dataParse.groupCheckinDataByVenue(app.model.pubsResponse);
		app.view.googleMapsView.displayCheckinsByVenue(venueCheckinArray);
	};

	var getBeerInfo = function(beerId) {
		var ajaxUrl = app.model.untappdApi.getBeerInfoUri(beerId);
		console.log(ajaxUrl);
		
		
		$.ajax({
			url: ajaxUrl,
		})
			.done(function(data) {
				console.log('beer info ajax successful');
				var div = dataParse.createBeerInfoDisplay(data);
				app.view.mainUIView.fadeInModal(div);
			})
			.fail(function(data) {
				console.log('beer info ajax fail');
				console.log(data);
			});
	};

	return {
		acquireLocation: acquireLocation,
		displayUserMarker: displayUserMarker,
		getLocalPubData: getLocalPubData,
		displayHeatMap: displayHeatMap,
		getBeerInfo: getBeerInfo
	};
};'use strict';

var dataParse = {
	getLatLngArray: function(data) {
		var dataArray = [];
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
		var dataArray = [];
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
		
		var ibus = (data.response.beer.beer_ibu === 0 || data.response.beer.beer_ibu === "") ?
						'<i>unknown</i>' : data.response.beer.beer_ibu;
		
		h3.textContent 	= data.response.beer.beer_name;
		h4a.innerHTML  	= data.response.beer.beer_style + '<br>' +
										 	data.response.beer.beer_abv + '% ABV' + '<br>' +
										 	ibus + ' IBU' + '<br>' +
										 	'Rated: ' + data.response.beer.rating_score + ' / 5.0';		
														
		h4b.innerHTML = 	'<img style=\'height:40px;\' src=\'' + data.response.beer.brewery.brewery_label + '\'>&nbsp;' +
											'<a href=\'' + data.response.beer.brewery.contact.url +'\' target=\'blank\'>' +
											data.response.beer.brewery.brewery_name + '</a>';
											
		p.textContent = (data.response.beer.beer_description !== "") ? 
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
};;/*
 * GoogleMapsView
 *
 * @author L.Rosselli
 * 
 */

 'use strict';

/* jshint loopfunc:true */

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
		} else {
			var userMarker = _markers.shift();
			userMarker.setMap(null);
		}
		return _map;
	};
	
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
			_markers.unshift(marker);

			resetMapCenter();

		} else {
			throw(new Error('Missing a parameter.'));
		}
	};

	var resetMapCenter = function() {
		if (_map && app.model.user.getGoogleLatLng()) {
			_map.setCenter(app.model.user.getGoogleLatLng());
			console.log('reset center');
		}
	};

	var displayHeatMap = function() {
		if (app.model.googleMVCArray) {
			_heatmap = new google.maps.visualization.HeatmapLayer({
			    data: app.model.googleMVCArray,
			    opacity: 0.7,
			    radius: 40
			  });
			_heatmap.setMap(_map);
		}
	};

	var removeHeatMap = function() {
		if (_heatmap) {
			_heatmap.setMap(null);
		}
	};
	
	/*
	 * @param venueData array
	 */
	var displayCheckinsByVenue = function(data) {
		clearVenueMarkers();
		
		_.each(data, function(v, k) {
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
	};
	
	var clearVenueMarkers = function() {
		_.each(_markers, function(element, index) {
			if (index > 0) {
				element.setMap(null);
			}
		});
		_markers = [];
		_infoWindows = [];
	};
	
	/*
	 * @param array of google.maps.Marker objects
	 * @param array of google.maps.InfoWindow objects
	 */
	var setupInfoWindowClose = function(markerArray, infoWindowArray) {
		_.each(infoWindowArray, function(element) {
			element.addListener('closeclick', function() {
				var t = this;
				var marker = _.find(markerArray, function(m) {
					return m.id === t.id;
				});
				marker.isOpen = false;
			});
		});
	};
	
	/*
	 * @param array of google.maps.Marker objects
	 * @param array of google.maps.InfoWindow objects
	 */
	var setupMarkerClickEvents = function(markerArray, infoWindowArray) {
		_.each(markerArray, function(element) {
			element.addListener('click', function() {
				// find this marker's matching infoWindow
				// and display it
				if (!this.isOpen) {
					var t = this;
					var infoWindow = _.find(infoWindowArray, function(w) {
						return w.id === t.id;
					});
					
					if (infoWindow) {
						infoWindow.open(_map, this);
					}
					
					this.isOpen = true;
				} 
			});
		});
	};
	
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
	};
};/*
 * Main
 * main entry point to the app
 *
 * @author L.Rosselli
 * 
 */

 'use strict';

/*
 * app object
 */
var app = {
	controller: null,
	model: null,
	view: null,
	testFxn: function() {
		console.log('testFxn');
	}
};

/*
 * On load, set up the main components of the app
 */
window.onload = function() {
	if (Model && View && Controller) {
		console.log('commence');
		
		app.controller = new Controller();
		app.model = new Model();
		app.view = new View();
		
		/*
		 * Explicitely creating  UntappdApi object and setting 
		 * directly to model. untappd.js is hidden from github
		 * due to containing clientId, clientSecret, and accessToken.
		 * I didn't want to use Node.js or PHP for this project... yet.
		 */
		app.model.untappdApi = new UntappdApi();
	
		app.controller.acquireLocation();
	}
};;/*
 * MainUIView
 *
 * @author L.Rosselli
 * 
 */

'use strict';

function MainUIView(value) {
	var _mainContainer = value;
	var _titleBar;
	var _menu;
	var _menuCloseBtn;
	var _menuOpenBtn;
	var _locateMeBtn;
	var _showActivityBtn;
	var _loadIcon1;
	var _loadIcon2;
	var _infoModal;
	var _infoCloseBtn;
	var _modalContent;
	
	(function init() {
		console.log('MainUIView constructor');
		
		_titleBar = document.getElementById('titleBar');
		_menu = document.getElementById('menu');
		_menuOpenBtn = document.getElementById('menuOpenBtn');
		_menuCloseBtn = document.getElementById('menuCloseBtn');
		_locateMeBtn = document.getElementById('locateMeBtn');
		_showActivityBtn = document.getElementById('showActivityBtn');
		_loadIcon1 = document.getElementById('loadIcon1'); // location
		_loadIcon2 = document.getElementById('loadIcon2'); // checkins
		_infoModal = document.getElementById('infoModal');
		_infoCloseBtn = document.getElementById('infoCloseBtn');
		_modalContent = document.getElementById('modalContent');
		
		$(_menuOpenBtn).click(function() {
			animateMenuOn();
		});

		$(_menuCloseBtn).click(function() {
			animateMenuOff();
		});

		$(_locateMeBtn).click(function() {
			console.log('locate button clicked');
			app.controller.acquireLocation();
			animateMenuOff();
		});

		$(_showActivityBtn).click(function() {
			app.controller.getLocalPubData(app.controller.displayHeatMap);
			animateMenuOff();
		});
		
		$(_loadIcon1).toggle();
		$(_loadIcon2).toggle();
		$(_infoModal).toggle();
		
		$(_infoCloseBtn).click(function() {
			$(_infoModal).fadeOut();
		});
		
	})();

	var animateMenuOn = function() {
		console.log('animateMenuOn');

		$(_mainContainer).animate({
			left: '0px'
		}, 250, function() {
			//console.log('animation on complete');
		});

		$(_menuOpenBtn).fadeOut();
	};

	var animateMenuOff = function() {
		$(_mainContainer).animate({
			left: '-300px'
		}, 250, function() {
			//console.log('animation off complete');
		});

		$(_menuOpenBtn).fadeIn();
	};
	
	var toggleLocationLoadIcon = function() {
		$(_loadIcon1).toggle();
	};
	
	var toggleCheckinsLoadIcon = function() {
		$(_loadIcon2).toggle();
	};
	
	var showLocationLoader = function() {
		var i = document.createElement('i');
		i.className = 'fa fa-refresh fa-spin';
		$(_menuOpenBtn).empty();
		_menuOpenBtn.appendChild(i);
	};
	
	var removeLocationLoader = function() {
		var i = document.createElement('i');
		i.className = 'fa fa-bars';
		$(_menuOpenBtn).empty();
		_menuOpenBtn.appendChild(i);
	};
	
	var fadeInModal = function(div) {
		if (div) {
			$(_modalContent).empty();
			_modalContent.appendChild(div);
			$(_infoModal).fadeIn();
		}
	};
	
	var fadeOutModal = function() {
		$(_infoModal).fadeOut();
	};
	
	return {
		get titleBar() {
			return _titleBar;
		},
		toggleLocationLoadIcon: toggleLocationLoadIcon,
		toggleCheckinsLoadIcon: toggleCheckinsLoadIcon,
		showLocationLoader: showLocationLoader,
		removeLocationLoader: removeLocationLoader,
		fadeInModal: fadeInModal,
		fadeOutModal: fadeOutModal
	};
};/*
 * Model
 *
 * @author L.Rosselli
 * 
 */

'use strict';

function Model() {
	var _untappdApi;
	var _user = new User();
	var _geoSuccess = false;
	var _pubsResponse;
	var _heatMapData;
	var _venueArray;
	var _googleMVCArray;
	
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
			if (typeof value === 'boolean') {
				_geoSuccess = value;
			}
		},
		get pubsResponse() {
			return _pubsResponse;
		},
		set pubsResponse(value) {
			_pubsResponse = value;
		},
		get heatMapData() {
			return _heatMapData;
		},
		set heatMapData(value) {
			_heatMapData = value;
		},
		get venueArray() {
			if (!_venueArray) {
				_venueArray = [];
			}
			return _venueArray;
		},
		get googleMVCArray() {
			return _googleMVCArray;
		}, 
		set googleMVCArray(value) {
			if (_googleMVCArray) {
				_googleMVCArray.clear();
				_googleMVCArray = value;
			} else {
				_googleMVCArray = value;
			}
		}
	};
};/*
 * Untappd
 *
 * @author L.Rosselli
 * 
 */

'use strict';

/* 
 	GoogleMaps API key:
	https://console.developers.google.com/project/onyx-syntax-92016/apiui/credential#
	AIzaSyDgRbfbZzgWuedjxAAM74oXSyxlw2vximE

	https://api.untappd.com/v4/thepub/local?access_token=A3DF816D42AA28B509413D4903139E8650A2B5C4&lat=41.878114&lng=-87.629798
	
	https://api.untappd.com/v4/beer/info/16630?access_token=A3DF816D42AA28B509413D4903139E8650A2B5C4

*/


function UntappdApi() {
	var baseUrl = 'https://api.untappd.com/v4/';
	var accessToken = 'A3DF816D42AA28B509413D4903139E8650A2B5C4';
	//var clientId = '5F0863FC89478BD8806475EF88AADED10917AFAC';
	//var clientSecret = 'B28EA9A1FC17D06C412ADA070E1FABADC83E7EC6';
	var localCheckin = 'thepub/local?';
	var beerInfo = 'beer/info/';
	
	var getPubsUri = function(lat, lng) {
		if (lat && lng) {
			return (baseUrl + localCheckin + 'access_token=' + accessToken + '&lat=' + lat + '&lng=' + lng);
		} else {
			throw (new Error('lat or lng is missing.'));
		}
	};
	
	var getBeerInfoUri = function(beerId) {
		if (beerId) {
			return (baseUrl + beerInfo + parseInt(beerId) + '?access_token=' + accessToken);
		}
	};
	
	return {
		getPubsUri: getPubsUri,
		getBeerInfoUri: getBeerInfoUri
	};
};/*
 * User
 *
 * @author L.Rosselli
 */

 'use strict';

function User() {
	var _location = {
		lat: null,
		lng: null
	};
	
	var getGoogleLatLng = function() {
		if (google.maps) {
			return new google.maps.LatLng(_location.lat, _location.lng);
		}
	};
	
	return {
		location: _location,
		getGoogleLatLng: getGoogleLatLng
	};
};/*
 * View
 *
 * @author L.Rosselli
 * 
 */

'use strict';

function View() {
	var _mainContainer = document.getElementById('mainContainer');
	var _googleMapsView = new GoogleMapsView();
	var _mainUIView = new MainUIView(_mainContainer);
	
	var init = function() {};
	
	return {
		mainUIView: _mainUIView,
		googleMapsView: _googleMapsView,
		init: init
	};
}