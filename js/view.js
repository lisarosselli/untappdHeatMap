/*
 * View
 *
 * @author L.Rosselli
 * 
 */

function View() {
	var _mainContainer = document.getElementById('mainContainer');
	var _googleMapsView = new GoogleMapsView();
	var _mainUIView = new MainUIView();
	
	
	
	var initMap = function() {
		_mainContainer.appendChild(_googleMapsView.init());
	}
	
	
	
	function MainUIView() {
		console.log('MainUIView');
		var titleBar = document.createElement('h3');
		titleBar.textContent = 'UntappdBeerApp';
		_mainContainer.appendChild(titleBar);
	}
	
	
	
	return {
		mainUIView: _mainUIView,
		googleMapsView: _googleMapsView,
		initMap: initMap
	}
}