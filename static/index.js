async function getTopPieces() {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection?' + new URLSearchParams({
		// Insert key here before running
		key: '',
		toppieces: 'True'
	}));
	const data = await res.json();

	return data;
}

async function createArtPage(artPiece) {
	const pageFiller = document.createElement('div');
	pageFiller.className = 'pagefiller';
	const body = document.querySelector('body');
	const main = document.querySelector('main');

	const artObject = document.createElement('div');
	const artObjectImage = document.createElement('img');
	artObjectImage.src = artPiece.webImage.url;
	artObjectImage.alt = artPiece.title;
	const artObjectTitle = document.createElement('h1');
	artObjectTitle.textContent = artPiece.title;
	const artObjectDetails = document.createElement('p');
	artObjectDetails.innerHTML = 
	`
	Information: <br>
	 - Title: ${artPiece.title} <br>
	 - Artist: ${artPiece.principalOrFirstMaker} <br>
	 - Location: ${artPiece.productionPlaces[0]}
	`

	artObject.appendChild(artObjectTitle);
	artObject.appendChild(artObjectImage);
	artObject.appendChild(artObjectDetails);

	pageFiller.addEventListener('click', event => {
		// event.preventDefault();
		pageFiller.animate([
			{ opacity: 100 },
			{ opacity: 0 }
		], {
			duration: 500,
			easing: 'ease-in-out'
		})

		setTimeout(() => {
			pageFiller.remove();
		}, 480);
	})
	pageFiller.appendChild(artObject);
	body.appendChild(pageFiller);
}

async function displayTopPieces() {
	const quickArtContainer = document.querySelector('.quick-art-container');
	
	const topPieces = await getTopPieces()
	// Truncate array for now
	topPieces.artObjects = topPieces.artObjects.slice(0,4);

	// loop over
	topPieces.artObjects.forEach(element => {
		const quickArt = document.createElement('div');
		quickArt.className = 'quick-art'
		const image = document.createElement('img');
		image.src = element.webImage.url;
		image.alt = element.title;
		const name = document.createElement('p');
		name.textContent = element.title;

		quickArt.addEventListener('click', event => {
			event.preventDefault();
			createArtPage(element);
		})

		quickArt.appendChild(image);
		quickArt.appendChild(name);
		quickArtContainer.appendChild(quickArt)
	});
}

displayTopPieces()