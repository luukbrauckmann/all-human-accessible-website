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

![image](https://user-images.githubusercontent.com/47314813/199541670-ee7a8a80-c461-479e-b7a1-28a2aea747ce.png)
![image](https://user-images.githubusercontent.com/47314813/199541968-d27a86c4-d755-48b3-a16c-c53631d78781.png)
![image](https://user-images.githubusercontent.com/47314813/199542611-b4ae9ef8-b748-49e6-a6df-2fc8faa2fab9.png)

Door op een blokje in de lijst of een marker te klikken selecteer je de Smart Zone en wordt het ingezoomd op de kaart. De website is toegankelijk met een screen reader.

## Kenmerken

De website is gebouwd met HTML, CSS & JavaScript.

### HTML

Structuur van de sidebar.
```
<article id="sidebar" tabindex="0">
	<header>
		<div>
			<h1 aria-label="Lijst met Smart Zones">Smart Zones</h1>
			<small id="item-count"></small>
		</div>
		<small>Klik op een smart zone om meer informatie te zien.</small>
	</header>
	<ul id="zone-list"></ul>
</article>
```

Structuur van de kaart.
```
<article id="kaart" tabindex="0">
	<header>
		<h1 aria-label="Kaart met Smart Zones">Kaart</h1>
		<small>Klik op een markerering om meer informatie te zien.</small>
	</header>
	<div id="map"></div>
</article>
```

### CSS

Standaard styling voor body & article. De header en footer schalen naar eigen content. Alles daar tussen vult de rest van de ruimte op, zodat de content een relatieve hoogte heeft.
```
body,
article {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}

body > header,
body > footer,
article > header,
article > footer {
	flex: 0 1 auto;
}

body > *,
article > * {
	flex: 1 1 auto;
	position: relative;
}
```
### JavaScript

Functie om de lijst van de Smart Zones op te maken.
```
/**
 * Builds HTML for the list
 * Adds items
 */
function buildList() {
	if (!items) return
	const itemCountElement = document.getElementById('item-count')
	itemCountElement.innerText = `${items.length} Smart Zones`
	itemCountElement.ariaLabel = `De lijst bevat ${items.length} Smart Zones`
	const listElement = document.getElementById('zone-list')
	items.forEach((item) => {
		const li = document.createElement('li')
		li.id = `smart-zone-${item.smartzoneId}`
		const button = document.createElement('button')
		button.ariaLabel = `${item.location}, ${item.town}`
		button.onclick = function () { toggleItem(item) }
		const html = `
			<img src="${item.image}" alt="Foto van ${item.location}, ${item.town}">
			<div>
				<h2>${item.name}</h2>
				<p>Adres: ${item.location}, ${item.town}</p>
				<p>Grootte: ${item.size}</p>
				<p>Beschikbaar: Ja</p>
			</div>
		`
		button.insertAdjacentHTML('beforeend', html)
		li.appendChild(button)
		listElement.appendChild(li)
	})
}
```

Functie om de kaart van Google Maps in te laden.
```
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
```

## Bronnen

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- [How To Do an Accessibility Review](https://web.dev/how-to-review/)
- [The A11Y Project Checklist](https://www.a11yproject.com/checklist/)

## Licentie

# Coding the Curbs

![Coding the Curbs](https://github.com/fdnd-projects/coding-the-curbs/blob/main/assets/coding-the-curbs.jpg?raw=true)

Coding the Curbs is een start-up die sinds januari 2020 werkt aan het slimmer maken van de steden. Door de ruimte in een stad te 'coderen' is het mogelijk om plekken diverse functies te laten vervullen op verschillende momenten. Denk daarbij aan een parkeerplek die ruimte biedt voor laden & lossen doordeweeks, en voor terrassen in het weekend. Sinds onze start zijn wij een stuk verder met het ontwikkelen van ons product.

## Resources

[Project board](https://github.com/orgs/fdnd-agency/projects/10)

[Styleguide](https://drive.google.com/file/d/1MxCIeJQF-YWejEC1b2s9jkcYF6pZUx0m/view?usp=sharing)

[Content](https://github.com/fdnd-agency/coding-the-curbs/blob/main/smart-zones.json)

[Website van CTC](https://www.codingthecurbs.com/?lang=nl)
