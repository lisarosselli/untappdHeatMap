/*
 * BeerMarker
 *
 * @author L.Rosselli
 *
 */

function BeerMarker(beerItem) {
	// will consume object like
	// app.model.pubsResponse.response.checkins.items[n]
	var _beerItem = beerItem;
	
	return {
		get beerItem() {
			return _beerItem;
		}
	}
}