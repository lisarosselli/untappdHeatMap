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
		app.model.untappdApi = new UntappdApi();
	
		app.controller.acquireLocation();
	}
};

/*
 * some notes
 * get the local pub data
 * understand the venues and locale of each checkin
 * catalog the beers that are being checked in
 * provide a search which auto-completes with
 * the beers that have been checked in
 */