/**
 * Initializes the sidebar,
 */
async function initSidebar() {
	buildList()
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
	itemCountElement.ariaLabel = `De lijst bevat ${items.length} Smart Zones`
	const listElement = document.getElementById('zone-list')
	items.forEach((item) => {
		const html = `
			<li id="smart-zone-${item.smartzoneId}">
				<button onclick="${function () { toggleItem(item) }}" aria-label="${item.location}, ${item.town}">
					<img src="${item.image}" alt="Foto van ${item.location}, ${item.town}">
					<div>
						<h2>${item.name}</h2>
						<p>Adres: ${item.location}, ${item.town}</p>
						<p>Grootte: ${item.size}</p>
						<p>Beschikbaar: Ja</p>
					</div>
				</button>
			</li>
		`
		listElement.insertAdjacentHTML('beforeend', html)
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