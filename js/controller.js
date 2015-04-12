/*
 * Controller
 *
 * @author L.Rosselli
 * 
 */

function Controller() {
	var _model;
	var _view;
	
	var components = {
		set model(value) {
			if (!_model) {
				_model = value;
			}
		},
		get model() {
			return _model;
		},
		set view(value) {
			if (!_view) {
				_view = value;
			}
		},
		get view() {
			return _view;
		}
	}
	
	return {
		components: components
	}
}