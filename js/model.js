/*
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
}