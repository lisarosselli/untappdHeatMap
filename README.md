# untappdHeatMap
A venue and checkin heat-map utilizing Untappd API and Google Maps API

Clone the repo and `npm install` , then `bower install`.
`grunt test` will jshint the JavaScript files.
`grunt build` will uglify and minify.

#### This is my final project for CSCIE-3
###### T.A.: JaZahn Clevenger

Due to my love of beer and of the [Untappd App](https://untappd.com/), once I found out that an API existed, I couldn't resist building an interactive view that I've been jonesing for since I started using the app. I've always wanted a heat-map view of nearby activity. This web app does that. It first gains access to the user's location via the Geolocation API (this part is crucial, the rest really doesn't matter if the app cannot locate you.) Then it makes a call to the Untappd API getting local check-in data. The app amalgamates the data by venue and creates a heat map of activity. You can click on the map to bring up an info window with the beers that have been checked in to these locations. Some information is given in that Google Maps info window, if you click Learn More another API call is made to get more specific information about the beer.

Now you'll never miss your favorite beer being on tap at the bar next door. :)

Also, the API only allows 100 calls per hour, so, if this borks, keep that in mind.
