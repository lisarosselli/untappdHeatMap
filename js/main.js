/*
 * Main
 * main entry point to the app
 *
 * @author L.Rosselli
 * 
 */

var app = {
	controller: null,
	model: null,
	view: null
};

window.onload = function() {
	if (Model && View && Controller) {
		console.log('commence');
		
		app.controller = new Controller();
		app.model = new Model();
		app.view = new View();
		
		// Explicitely creating  UntappdApi object and setting 
		// directly to model. untappd.js is hidden from github
		// due to containing clientId, clientSecret, and accessToken.
		app.model.setUntappdApi(new UntappdApi());
	
		app.controller.acquireLocation();
	}
};