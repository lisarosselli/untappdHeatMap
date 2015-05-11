/*
 * Main
 * main entry point to the app
 *
 * @author L.Rosselli
 * 
 */

/*
 * app object
 */
var app = {
	controller: null,
	model: null,
	view: null,
	testFxn: function() {
		console.log('testFxn');
	}
};

/*
 * On load, set up the main components of the app
 */
window.onload = function() {
	if (Model && View && Controller) {
		console.log('commence');
		
		app.controller = new Controller();
		app.model = new Model();
		app.view = new View();
		
		/*
		 * Explicitely creating  UntappdApi object and setting 
		 * directly to model. untappd.js is hidden from github
		 * due to containing clientId, clientSecret, and accessToken.
		 * I didn't want to use Node.js or PHP for this project... yet.
		 */
		app.model.untappdApi = new UntappdApi();
	
		app.controller.acquireLocation();
	}
};

/*
	TODO:
	x. check fxnality for locate me btn
	x. modal message on geolocation fail
	x. background on initial load, icon only
	4. beer info overflow
*/