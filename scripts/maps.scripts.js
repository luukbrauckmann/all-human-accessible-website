let map = null
let markers = []
let settings = {
	center: { lat: 52.2434979, lng: 5.6343227 },
	zoom: 7,
	disableDefaultUI: true,
	zoomControl: true
}
let infoWindow = null

/**
 * Initializes map with Google Maps API
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), settings)
	infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  })
	markers = items.map((item) => ({ id: item.smartzoneId, marker: placeMarker(item) }))
}

function placeMarker(item) {
	const marker = new google.maps.Marker({
    position: item.coordinates,
    map,
		title: `Markering voor ${item.location}, ${item.town}. Druk op enter om het te selecteren.`,
		optimized: false,
  })
	marker.addListener("click", () => selectItem(item))
	return marker
}

function removeMarkers() {
	markers.forEach(marker => marker.setMap(null))
	markers = null
	console.log(markers)
}

function zoomInOnSelectedItem(item) {
	map.setCenter(item.coordinates)
	map.setZoom(20)
	const marker = markers.find((marker) => marker.id === item.smartzoneId).marker
	openInfoWindow(item, marker)
}

function openInfoWindow(item, marker) {
	infoWindow.setContent(`
		<h2>${item.name}</h2>
		<p>Adres: ${item.location}, ${item.town}</p>
		<p>Grootte: ${item.size}</p>
		<p>Beschikbaar: Ja</p>
	`)
	infoWindow.open(map, marker)
	infoWindow.addListener('closeclick', ()=> unselectItem(item))
}


