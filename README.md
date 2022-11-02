# Smart Zones pagina voor Coding the Curbs
Voor vervoerders van goederen heeft Coding the Curbs een pagina met een kaart waar zij Smart Zones kunnen zien

## Inhoud

- Beschrijving
- Kenmerken
- Bronnen
- Licentie

## Beschrijving
User stories:
> Als vervoerder van goederen wil ik een overzicht van smart zones in een stad kunnen bekijken, zodat ik kan zien waar ik kan parkeren om mijn goederen te laden en/of lossen

> Als vervoerder van goederen wil ik, onderweg vanuit mijn voertuig, meer informatie over een smart zone kunnen bekijken, zodat ik kan zien of de zone geschikt is om mijn goederen te laden en / of lossen

> Responsive

![image](https://user-images.githubusercontent.com/47314813/195833428-621a84eb-1455-429c-b1ad-1506510dbf19.png)
![image](https://user-images.githubusercontent.com/47314813/195833598-1009dddb-b3cc-4643-bb98-3a7c7f4d40e0.png)

Op de pagina is een lijst en een kaart te zien met Smart Zones en markeringen.

![image](https://user-images.githubusercontent.com/47314813/195833544-8fb466ba-1312-4da0-9cb6-bb4f5d88783b.png)
![image](https://user-images.githubusercontent.com/47314813/195833700-d77ce11e-9432-428b-8712-1e1c37bc5adb.png)

Door op een blokje in de lijst of een marker te klikken selecteer je de Smart Zone en wordt het ingezoomd op de kaart

## Kenmerken

De website is gebouwd met HTML, CSS & JavaScript.

### HTML

Hieronder leg ik de structuur uit van de applicatie.

#### Head

```
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="styles.css">
	<link rel="stylesheet" href="./assets/breakpoint-files/sm-screen.css">
	<link rel="stylesheet" href="./assets/breakpoint-files/md-screen.css">
	<link rel="stylesheet" href="./assets/breakpoint-files/lg-screen.css">
	<link rel="stylesheet" href="./assets/breakpoint-files/xl-screen.css">
	<link rel="stylesheet" href="./assets/breakpoint-files/xxl-screen.css">

	<!-- External scripts -->
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4772rvRhPiMHXGIC-1HS_FLTbKoE_wUc&v=weekly&language=nl&region=NL"
		defer></script>

	<!-- Local scripts -->
	<script src="scripts/scripts.js"></script>
	<script src="scripts/sidebar.scripts.js"></script>
	<script src="scripts/maps.scripts.js"></script>

	<title>Coding the Curbs</title>
</head>
```

#### Body

```
<body>
	<div class="container">
		<header id="root-header">
			<img
				src="https://static.wixstatic.com/media/21dd0d_050319353c314f00b14e0fc7970173d8~mv2.png/v1/fill/w_163,h_56,al_c,q_95,enc_auto/CTC_Logo_Wit.png"
				alt="Logo" height="45">
		</header>

		<main>
			<!-- Sidebar with list of locations  -->
			<section id="sidebar">
				<header>
					<section>
						<h2>Smart Zones</h2>
						<small id="item-count"></small>
					</section>
					<section>
						<small>Klik op een smart zone om meer informatie te zien.</small>
					</section>
				</header>
				<ul id="zone-list"></ul>
			</section>

			<!-- Google maps API -->
			<section id="map-container" class="container">
				<header>
					<h2>Kaart</h2>
					<small>Klik op een markerering om meer informatie te zien.</small>
				</header>
				<section id="map"></section>
			</section>
		</main>

		<footer id="root-footer">
			<!-- Button to toggle the sidebar -->
			<button id="sidebar-button" onclick="toggleSidebar()">Lijst weergeven</button>
		</footer>
	</div>

</body>
```

### CSS

#### styles.css

Algemene styles.

```
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

:root {
	--background-color: #fafafa;
	--spacing: 1rem;
	--border-radius: 5px;

	--primary-color: #4f52c9;
	--accent-color: #59ffec;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html {
	font-size: 16px;
	line-height: 1rem;
}

body {
	font-family: Roboto, san-serif;
	/* background-color: var(--background-color); */
}

html,
body {
	height: 100%;
}

h1,h2,h3 {
	font-family: Rajdhani, san-serif;
}

.container {
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
}
.container > header,
.container > footer {
	flex: 0 1 auto;
	padding: var(--spacing);
}

.container > header,
.container > main,
.container > footer {
	position: relative;
}

.container > main,
.container > section {
	flex: 1 1 auto;
}

.container > main {
	overflow: hidden;
}

#root-header {
	background-color: var(--primary-color);
	color: white;
	padding: var(--spacing);
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.5),0 0 5px rgba(0,0,0,.5);
	z-index: 2;
}

#root-header > button {
	display: none;
}

#root-footer {
	padding: 0;
}

footer {
	background-color: var(--primary-color);
}


button {
	background-color: var(--primary-color);
	border: 1px solid var(--primary-color);
	border-radius: var(--border-radius);
	padding: var(--spacing);
	color: white;
	cursor: pointer;
}
button.accent {
	background-color: var(--accent-color);
	border-color: var(--accent-color);
	color: black;
}

#sidebar {
	background-color: white;
	display: flex;
	flex-flow: column;
	gap: var(--spacing);
	position: absolute;
	height: 100%;
	width: 100%;
	top: 100%;
	left: 0;
	padding: var(--spacing);
	transition: .2s ease-in-out;
	z-index: 1;
}

#sidebar.visible {
	top: 0;
}

#sidebar > ul {
	list-style: none;
	display: flex;
	flex-flow: column;
	gap: var(--spacing);
	overflow-y: scroll;
}

#sidebar > ul > li {
	background-color: var(--primary-color);
	padding: var(--spacing);
	border-radius: var(--border-radius);
	border: 3px solid var(--primary-color);
	color: white;
	display: flex;
	flex-flow: column;
	gap: calc(var(--spacing) / 2);
  transition: .2s;
	cursor: pointer;
}

#sidebar > ul > li:hover {
	background-color:white;
	color: var(--primary-color);
}

#sidebar > ul > li.highlight {
	background-color: var(--accent-color);
	border-color: var(--accent-color);
	color: #09102E;
}

#sidebar > ul > li.highlight:hover {
	background-color: white;
	border-color: white;
	color: var(--primary-color);
}

#sidebar > header {
	display: flex;
	flex-flow: column;
	gap: calc(var(--spacing) / 2);
}

#sidebar > header > section {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: flex-end;
}

#sidebar-button {
	width: 100%;
	border-radius: 0;
	padding: var(--spacing);
	height: 65px;
	font-size: 1.25rem;
	/* box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px rgba(0,0,0,.5); */
	z-index: 2;
}

#map {
  height: 100%;
}

#map-container header h2 {
	margin-bottom: calc(var(--spacing) / 2);
}
```

#### xl-screen.css

Styles voor xl schermen.

```
@media (min-width: 1200px) {
	.container > header#root-header {
		justify-content: flex-start;
	}
	.container > header#root-header > button {
		display: inline;
	}
	.container > main {
		display: flex;
	}
	.container > footer {
		display: none;
	}

	#sidebar {
		position: relative;
		top: 0;
		width: 500px;
	}
}
```

### JavaScript

#### scripts.js

Algemene scripts.

```
window.addEventListener('load', (event) => init())

var items = null

/**
 * Initialize function
 * Runs when app loads.
 */
async function init() {
	await getItems()
	await initSidebar()
	initMap()
}

async function getItems() {
	return fetch('https://raw.githubusercontent.com/luukbrauckmann/coding-the-curbs/main/assets/smart-zones.json')
		.then((response) => response.json())
		.then((data) => items = data)
		.catch(() => undefined)
}
```

#### sidebar.scripts.js

Scripts voor de sidebar.

```
/**
 * Initializes the sidebar,
 */
async function initSidebar() {
	buildList()
}

/**
 * Toggles the sidebar class.
 * Class visible sets top to 0.
 */
function toggleSidebar() {
	const sidebar = document.getElementById('sidebar')
	sidebar.classList.toggle('visible')
	const sidebarButton = document.getElementById('sidebar-button')
	sidebarButton.innerText = sidebar.classList.contains('visible') ? 'Lijst verbergen' : 'Lijst weergeven'
}

function closeSidebar() {
	const sidebar = document.getElementById('sidebar')
	sidebar.classList.remove('visible')
	const sidebarButton = document.getElementById('sidebar-button')
	sidebarButton.innerText = 'Lijst weergeven'
}

/**
 * Builds HTML for the list
 * Adds items
 */
function buildList() {
	if (!items) return
	const itemCountElement = document.getElementById('item-count')
	itemCountElement.innerText = `${items.length} Smart Zones`
	const listElement = document.getElementById('zone-list')
	items.forEach((item) => {
		const li = document.createElement('li')
		li.id = `smart-zone-${item.smartzoneId}`
		const html = `
			<h3>${item.name}</h3>
			<p>Adres: ${item.location}, ${item.town}</p>
			<p>Grootte: ${item.size}</p>
			<p>Beschikbaar: Ja</p>
		`
		li.insertAdjacentHTML('beforeend', html)
		li.onclick = function () { toggleItem(item) }
		listElement.appendChild(li)
	})
}

function toggleItem(item) {
	const li = document.getElementById(`smart-zone-${item.smartzoneId}`)
	if (li.classList.contains('highlight')) unselectItem(item)
	else selectItem(item)
}

function selectItem(item) {
	const ul = document.getElementById('zone-list')
	const ulItems = Array.from(ul.getElementsByTagName('li'))
	ulItems.forEach((ulItem) => ulItem.classList.remove('highlight'))
	const li = document.getElementById(`smart-zone-${item.smartzoneId}`)
	li.classList.add('highlight')
	closeSidebar()
	zoomInOnSelectedItem(item)
}

function unselectItem(item) {
	const li = document.getElementById(`smart-zone-${item.smartzoneId}`)
	li.classList.remove('highlight')
	initMap()
}
```

#### map.scripts.js

Scripts voor de map.

```
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
		<h3>${item.name}</h3>
		<p>Adres: ${item.location}, ${item.town}</p>
		<p>Grootte: ${item.size}</p>
		<p>Beschikbaar: Ja</p>
	`)
	infoWindow.open(map, marker)
	infoWindow.addListener('closeclick', ()=> unselectItem(item))
}
```

## Bronnen

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

## Licentie





# Coding the Curbs

![Coding the Curbs](https://github.com/fdnd-projects/coding-the-curbs/blob/main/assets/coding-the-curbs.jpg?raw=true)

Coding the Curbs is een start-up die sinds januari 2020 werkt aan het slimmer maken van de steden. Door de ruimte in een stad te 'coderen' is het mogelijk om plekken diverse functies te laten vervullen op verschillende momenten. Denk daarbij aan een parkeerplek die ruimte biedt voor laden & lossen doordeweeks, en voor terrassen in het weekend. Sinds onze start zijn wij een stuk verder met het ontwikkelen van ons product.

## Resources

[Project board](https://github.com/orgs/fdnd-agency/projects/10)

[Styleguide](https://drive.google.com/file/d/1MxCIeJQF-YWejEC1b2s9jkcYF6pZUx0m/view?usp=sharing)

[Content](https://github.com/fdnd-agency/coding-the-curbs/blob/main/smart-zones.json)

[Website van CTC](https://www.codingthecurbs.com/?lang=nl)
