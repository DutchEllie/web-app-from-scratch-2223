const key = 'PgOnkq9m';

async function getTopPieces() {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection?' + new URLSearchParams({
		// Insert key here before running
		key: key,
		toppieces: 'True'
	}));
	const data = await res.json();

	return data;
}

async function getObjectFull(objnum) {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection/' + objnum + '?'
		+ new URLSearchParams({
			key: key
	}));
	const data = await res.json();

	return data;
}

async function getSearchResults(query) {
	const res = await fetch('https://www.rijksmuseum.nl/api/nl/collection?' + new URLSearchParams({
		// Insert key here before running
		key: key,
		q: query
	}));

	const data = await res.json();

	return data;
}

async function search(event) {
	const input = document.querySelector('#search').value;
	const data = await getSearchResults(input);

	createArtResultPage(data);

}

async function createArtResultPage(searchRes) {
	// Create pagefiller object
	// 1. Display it
	// 2. Make loading state
	// 3. Load data
	// 4. Display data

	// Make pagefiller
	const pageFiller = document.createElement('div');
	pageFiller.className = 'pagefiller';
	// Append to body
	const body = document.querySelector('.app-wrapper');
	body.appendChild(pageFiller);

	// Create search results
	const searchResults = document.createElement('div');
	searchResults.className = 'searchresults';
	const searchResultsTitle = document.createElement('h1');
	searchResultsTitle.textContent = 'Search Results'
	searchResults.appendChild(searchResultsTitle);

	// Create close button
	const closer = document.createElement('span');
	closer.className = 'closebutton';
	setTimeout(() => {
		closer.addEventListener('click', event => {
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
	}, 480);

	searchResults.appendChild(closer);
	pageFiller.appendChild(searchResults);
	searchRes.artObjects.forEach(piece => {
		const artPieceResult = document.createElement('div');
		artPieceResult.className = 'artpiece';
		const artPieceResultImage = document.createElement('img');
		const artPieceResultTitle = document.createElement('p');
		artPieceResultImage.src = piece.webImage.url;
		artPieceResultImage.alt = piece.longTitle;
		artPieceResultTitle.textContent = piece.title;
		artPieceResult.appendChild(artPieceResultImage);
		artPieceResult.appendChild(artPieceResultTitle);
		artPieceResult.addEventListener('click', event => {
			event.preventDefault();
			createArtPage(piece);
		})

		searchResults.appendChild(artPieceResult);
	})
}

async function createArtPage(artPiece) {
	// Create pageFiller object
	// 1. Then go and display it
	// 2. Make loading state
	// 3. Load data
	// 4. Display data

	// 1. Create page and display it
	const pageFiller = document.createElement('div');
	pageFiller.className = 'pagefiller';
	const body = document.querySelector('.app-wrapper');
	body.appendChild(pageFiller);
	// Set the addEventListener in a timeout, so you can't activate 
	// the removal before the object is loaded
	setTimeout(() => {
		pageFiller.addEventListener('click', event => {
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
	}, 480);

	// Create the artObject, needed for the next step
	const artObject = document.createElement('div');
	artObject.className = 'artobject';
	const artObjectImage = document.createElement('img');
	const artObjectTitle = document.createElement('h1');
	const artObjectDetails = document.createElement('div');
	const artObjectDescription = document.createElement('div');
	const artObjectLoader = document.createElement('div');
	artObjectLoader.className = 'loading';
	for(let i = 0; i < 4; i++) {
		artObjectLoader.appendChild(document.createElement('span'));
	}
	const loadingText = document.createElement('h1');
	loadingText.textContent = 'Loading...';
	artObject.appendChild(artObjectLoader);
	artObject.appendChild(loadingText);
	pageFiller.appendChild(artObject);

	// Starting fetching the data
	var fullData;
	getObjectFull(artPiece.objectNumber).then(async(res) =>  {
		await new Promise(r => setTimeout(r, 2000))
		fullData = res;

		// Display data
		if(res.artObject.webImage?.url) {
			artObjectImage.src = res.artObject.webImage.url;
		} else {
			artObjectImage.src = artPiece.webImage.url;
		}
		artObjectImage.alt = res.artObject.title;
		artObjectTitle.textContent = artPiece.title;
		artObjectDetails.innerHTML = 
		`
		<h3>Information</h3>
		<p>
		- Title:    ${artPiece.title} <br>
		- Artist:   ${artPiece.principalOrFirstMaker} <br>
		- Location: ${artPiece.productionPlaces[0]} <br><br>
		</p>
		<h3>Description</h3>
		<p>${res.artObject.description}</p>
		`

		artObjectDescription.innerHTML = 
		`
		`
		artObject.removeChild(artObjectLoader);
		artObject.removeChild(loadingText);
		artObject.appendChild(artObjectTitle);
		artObject.appendChild(artObjectImage);
		artObject.appendChild(artObjectDetails);
		artObject.appendChild(artObjectDescription);
	});

}

async function displayTopPieces() {
	const quickArtContainer = document.querySelector('.quick-art-container');
	
	const topPieces = await getTopPieces()
	// Truncate array for now
	topPieces.artObjects = topPieces.artObjects.slice(0,4);

	// loop over
	topPieces.artObjects.forEach(element => {
		const quickArt = document.createElement('div');
		quickArt.className = 'artpiece'
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