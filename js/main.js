/*
 * Main
 * main entry point to the app
 *
 * @author L.Rosselli
 * 
 */

var app = {
	controller: null
};

window.onload = function() {
	if (Model && View && Controller) {
		console.log('commence');
		
		var controller = new Controller();
		controller.components.model = new Model();
		
		// Explicitely creating  UntappdApi object and setting 
		// directly to model. untappd.js is hidden from github
		// due to containing clientId, clientSecret, and accessToken.
		controller.components.model.setUntappdApi(new UntappdApi());
		
		app.controller = controller;
		
	}
};