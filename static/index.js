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
