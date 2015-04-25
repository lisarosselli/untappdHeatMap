/*
 * View
 *
 * @author L.Rosselli
 * 
 */

function View() {
	var _mainContainer = document.getElementById('mainContainer');
	var _googleMapsView = new GoogleMapsView();
	var _mainUIView = new MainUIView(_mainContainer);
	

	var init = function() {
		//_mainUIView.showTitleBar();
		
		if (_googleMapsView) {
			_googleMapsView.init();
		}
	}
	
	
	
	
	
	return {
		mainUIView: _mainUIView,
		googleMapsView: _googleMapsView,
		init: init
	}
}