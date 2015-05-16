/*
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