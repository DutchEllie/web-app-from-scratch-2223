import { getObjectFull, getSearchResults, getTopPieces } from "./api.js";
import { HomePage } from './components/homepage.js';
import { ArtPage } from "./components/artpage.js";
import { SearchPage } from "./components/searchpage.js";
import './routie.min.js';

customElements.define('homepage-element', HomePage);
customElements.define('artpage-element', ArtPage);
customElements.define('searchpage-element', SearchPage);

routie({
	'': function() {
		const wrapper = document.querySelector('.app-wrapper');
		// Reset value
		wrapper.innerHTML = "";

		const HomePageElement = document.createElement('homepage-element');
		wrapper.appendChild(HomePageElement);
	},
	'art/:id': function(artID) {
		const wrapper = document.querySelector('.app-wrapper');
		// Reset value
		wrapper.innerHTML = "";
		const ArtPageElement = document.createElement('artpage-element');
		// console.log(artID)
		ArtPageElement.id = artID;
		// console.log(artID)
		wrapper.appendChild(ArtPageElement);
	},
	'search/:query': function(query) {
		const wrapper = document.querySelector('.app-wrapper');
		// Reset value
		wrapper.innerHTML = "";
		const SearchPageElement = document.createElement('searchpage-element');
		SearchPageElement.setAttribute('data-searchquery', query);
		SearchPageElement.className = "searchresults"
		wrapper.appendChild(SearchPageElement);
	}
})

// function $(selector) {
// 	return document.querySelector(selector);
// }

// export async function search(event) {
// 	const input = document.querySelector('#search').value;
// 	const data = await getSearchResults(input);

// 	createArtResultPage(data);
// }

// async function createArtResultPage(searchRes) {
// 	// Create pagefiller object
// 	// 1. Display it
// 	// 2. Make loading state
// 	// 3. Load data
// 	// 4. Display data

// 	// Make pagefiller
// 	const pageFiller = document.createElement('div');
// 	pageFiller.className = 'pagefiller';
// 	// Append to body
// 	const body = document.querySelector('.app-wrapper');
// 	body.appendChild(pageFiller);

// 	// Create search results
// 	const searchResults = document.createElement('div');
// 	searchResults.className = 'searchresults';
// 	const searchResultsTitle = document.createElement('h1');
// 	searchResultsTitle.textContent = 'Search Results'
// 	searchResults.appendChild(searchResultsTitle);

// 	// Create close button
// 	const closer = document.createElement('span');
// 	closer.className = 'closebutton';
// 	setTimeout(() => {
// 		closer.addEventListener('click', event => {
// 			pageFiller.animate([
// 				{ opacity: 100 },
// 				{ opacity: 0 }
// 			], {
// 				duration: 500,
// 				easing: 'ease-in-out'
// 			})

// 			setTimeout(() => {
// 				pageFiller.remove();
// 			}, 480);
// 		})
// 	}, 480);

// 	searchResults.appendChild(closer);
// 	pageFiller.appendChild(searchResults);
// 	searchRes.artObjects.forEach(piece => {
// 		const artPieceResult = document.createElement('div');
// 		artPieceResult.className = 'artpiece';
// 		const artPieceResultImage = document.createElement('img');
// 		const artPieceResultTitle = document.createElement('p');
// 		artPieceResultImage.src = piece.webImage.url;
// 		artPieceResultImage.alt = piece.longTitle;
// 		artPieceResultTitle.textContent = piece.title;
// 		artPieceResult.appendChild(artPieceResultImage);
// 		artPieceResult.appendChild(artPieceResultTitle);
// 		artPieceResult.addEventListener('click', event => {
// 			event.preventDefault();
// 			createArtPage(piece);
// 		})

// 		searchResults.appendChild(artPieceResult);
// 	})
// }

// async function createArtPage(artPiece) {
// 	// Create pageFiller object
// 	// 1. Then go and display it
// 	// 2. Make loading state
// 	// 3. Load data
// 	// 4. Display data

// 	// 1. Create page and display it
// 	const pageFiller = document.createElement('div');
// 	pageFiller.className = 'pagefiller';
// 	const body = document.querySelector('.app-wrapper');
// 	body.appendChild(pageFiller);
// 	// Set the addEventListener in a timeout, so you can't activate 
// 	// the removal before the object is loaded
// 	setTimeout(() => {
// 		pageFiller.addEventListener('click', event => {
// 			pageFiller.animate([
// 				{ opacity: 100 },
// 				{ opacity: 0 }
// 			], {
// 				duration: 500,
// 				easing: 'ease-in-out'
// 			})

// 			setTimeout(() => {
// 				pageFiller.remove();
// 			}, 480);
// 		})
// 	}, 480);

// 	// Create the artObject, needed for the next step
// 	const artObject = document.createElement('div');
// 	artObject.className = 'artobject';
// 	const artObjectImage = document.createElement('img');
// 	const artObjectTitle = document.createElement('h1');
// 	const artObjectDetails = document.createElement('div');
// 	const artObjectDescription = document.createElement('div');
// 	const artObjectLoader = document.createElement('div');
// 	artObjectLoader.className = 'loading';
// 	for(let i = 0; i < 4; i++) {
// 		artObjectLoader.appendChild(document.createElement('span'));
// 	}
// 	const loadingText = document.createElement('h1');
// 	loadingText.textContent = 'Loading...';
// 	artObject.appendChild(artObjectLoader);
// 	artObject.appendChild(loadingText);
// 	pageFiller.appendChild(artObject);

// 	// Starting fetching the data
// 	var fullData;
// 	getObjectFull(artPiece.objectNumber).then(async(res) =>  {
// 		await new Promise(r => setTimeout(r, 2000))
// 		fullData = res;

// 		// Display data
// 		if(res.artObject.webImage?.url) {
// 			artObjectImage.src = res.artObject.webImage.url;
// 		} else {
// 			artObjectImage.src = artPiece.webImage.url;
// 		}
// 		artObjectImage.alt = res.artObject.title;
// 		artObjectTitle.textContent = artPiece.title;
// 		artObjectDetails.innerHTML = 
// 		`
// 		<h3>Information</h3>
// 		<p>
// 		- Title:    ${artPiece.title} <br>
// 		- Artist:   ${artPiece.principalOrFirstMaker} <br>
// 		- Location: ${artPiece.productionPlaces[0]} <br><br>
// 		</p>
// 		<h3>Description</h3>
// 		<p>${res.artObject.description}</p>
// 		`

// 		artObjectDescription.innerHTML = 
// 		`
// 		`
// 		artObject.removeChild(artObjectLoader);
// 		artObject.removeChild(loadingText);
// 		artObject.appendChild(artObjectTitle);
// 		artObject.appendChild(artObjectImage);
// 		artObject.appendChild(artObjectDetails);
// 		artObject.appendChild(artObjectDescription);
// 	});

// }

// Remove the preload class from the body
// This class is used to disable animations on the load
// and is removed after 500 ms
// setTimeout(function(){
//     document.body.className="";
// },500);

// const searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	search(e);
// });
