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
		_loadIcon1 = document.getElementById('loadIcon1'); // location
		_loadIcon2 = document.getElementById('loadIcon2'); // checkins
		_infoModal = document.getElementById('infoModal');
		_infoCloseBtn = document.getElementById('infoCloseBtn');
		_modalContent = document.getElementById('modalContent');
		
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
			app.controller.getLocalPubData(app.controller.displayHeatMap);
			//animateMenuOff();
		});
		
		$(_loadIcon1).toggle();
		$(_loadIcon2).toggle();
		$(_infoModal).toggle();
		
		$(_infoCloseBtn).click(function() {
			$(_infoModal).fadeOut();
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
	
	var toggleLocationLoadIcon = function() {
		$(_loadIcon1).toggle();
	}
	
	var toggleCheckinsLoadIcon = function() {
		$(_loadIcon2).toggle();
	}
	
	var fadeInModal = function(data) {
		if (data != undefined && data != null) {
			$(_modalContent).empty();
			var divHtml = dataParse.createBeerInfoDisplay(data);
			_modalContent.appendChild(divHtml);
		}
		
		$(_infoModal).fadeIn();
	}
	
	var fadeOutModal = function() {
		$(_infoModal).fadeOut();
	}
	
	return {
		get titleBar() {
			return _titleBar;
		},
		toggleLocationLoadIcon,
		toggleCheckinsLoadIcon,
		fadeInModal: fadeInModal,
		fadeOutModal: fadeOutModal
	}
}