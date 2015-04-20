/*
 * MainUIView
 *
 * @author L.Rosselli
 * 
 */

function MainUIView(value) {
	console.log('MainUIView');
	
	var _mainContainer = value;
	var _titleBar;
	
	var showTitleBar = function() {
		if (!_titleBar) {
			_titleBar = document.createElement('div');
			_titleBar.setAttribute('id', 'titleBar');
			
			var header = document.createElement('h3');
			header.textContent = 'UntappdBeerApp';
			
			_titleBar.appendChild(header);
			_mainContainer.insertBefore(_titleBar, app.model.mapCanvasElement);
		}
	}
	
	return {
		showTitleBar: showTitleBar
	}
}