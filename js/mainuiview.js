/*
 * MainUIView
 *
 * @author L.Rosselli
 * 
 */

function MainUIView(value) {
	var _mainContainer = value;
	var _titleBar;
	var _locateMeBtn;
	var _showActivityBtn;
	
	(function init() {
		console.log('MainUIView constructor');
		
		_titleBar = document.getElementById('titleBar');
		_locateMeBtn = document.getElementById('locateMe');
		_showActivityBtn = document.getElementById('showActivity');
		
		$(_showActivityBtn).click(function() {
			app.controller.getLocalPubData();
			//showActivityLoading();
		});
		
	})();
	
	var showActivityLoading = function() {
		console.log('showActivityLoading');
		$(_showActivityBtn).removeClass('fa fa-beer').addClass('fa fa-spinner fa-pulse');
	}
	
	var showActivityLoaded = function() {
		console.log('showActivityLoaded');
		$(_showActivityBtn).removeClass('fa fa-spinner fa-pulse').addClass('fa fa-beer');
	}

	
	return {
		get titleBar() {
			return _titleBar;
		},
		showActivityLoading: showActivityLoading,
		showActivityLoaded: showActivityLoaded
	}
}