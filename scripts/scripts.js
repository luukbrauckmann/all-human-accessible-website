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

/**
 * Toggles the content class.
 * Class visible sets top to 0.
 */
 function toggleSidebar() {
	const sidebar = document.getElementById('sidebar')
	sidebar.classList.toggle('visible')

	const sidebarButton = document.getElementById('sidebar-button')
	sidebarButton.innerText = sidebar.classList.contains('visible') ? 'Lijst verbergen' : 'Lijst weergeven'

	const kaart = document.getElementById('kaart')
	kaart.classList.toggle('hidden')

	if (sidebar.classList.contains('visible')) sidebar.focus()
}

