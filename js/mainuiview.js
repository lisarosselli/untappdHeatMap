/*
 * MainUIView
 *
 * @author L.Rosselli
 * 
 */

function MainUIView(value) {
	var _mainContainer = value;
	var _titleBar;
	var _menu;
	var _menuCloseBtn;
	var _locateMeBtn;
	var _showActivityBtn;
	
	(function init() {
		console.log('MainUIView constructor');
		
		_titleBar = document.getElementById('titleBar');
		_menu = document.getElementById('menu');
		_menuOpenBtn = document.getElementById('menuOpenBtn');
		_menuCloseBtn = document.getElementById('menuCloseBtn');
		_locateMeBtn = document.getElementById('locateMeBtn');
		_showActivityBtn = document.getElementById('showActivityBtn');
		_showPlots = document.getElementById('showPlots');

		
		$(_menuOpenBtn).click(function(e) {
			animateMenuOn();
		});

		$(_menuCloseBtn).click(function(e) {
			animateMenuOff();
		})

		$(_locateMeBtn).click(function() {
			console.log('locate button clicked');
			app.controller.acquireLocation();
		});

		$(_showActivityBtn).click(function() {
			app.controller.getLocalPubData(app.controller.displayHeatMap); //TODO: add callback
			//animateMenuOff();
		});
		
		$(_showPlots).click(function() {
			app.controller.displayCheckinsByVenue();
			//animateMenuOff();
		})

		
	})();

	var animateMenuOn = function() {
		console.log('animateMenuOn');

		$(_mainContainer).animate({
			left: '0px'
		}, 250, function() {
			//console.log('animation on complete');
		})

		$(_menuOpenBtn).fadeOut();
	}

	var animateMenuOff = function() {
		$(_mainContainer).animate({
			left: '-300px'
		}, 250, function() {
			//console.log('animation off complete');
		});

		$(_menuOpenBtn).fadeIn();

	}


	
	return {
		get titleBar() {
			return _titleBar;
		}
	}
}