import { HomePage } from './components/homepage.js';
import { ArtPage } from "./components/artpage.js";
import { SearchPage } from "./components/searchpage.js";
import { QuickArtObject } from './components/quickartobject.js';
import './routie.min.js';

customElements.define('homepage-element', HomePage);
customElements.define('artpage-element', ArtPage);
customElements.define('searchpage-element', SearchPage);
customElements.define('quickart-element', QuickArtObject);

const wrapper = document.querySelector('.app-wrapper');
routie({
	'': function() {
		// Reset value
		wrapper.innerHTML = "";

		const HomePageElement = document.createElement('homepage-element');
		wrapper.appendChild(HomePageElement);
	},
	'art/:id': function(artID) {
		// Reset value
		wrapper.innerHTML = "";

		const ArtPageElement = document.createElement('artpage-element');
		ArtPageElement.id = artID;
		wrapper.appendChild(ArtPageElement);
	},
	'search/:query': function(query) {
		// Reset value
		wrapper.innerHTML = "";

		const SearchPageElement = document.createElement('searchpage-element');
		SearchPageElement.setAttribute('data-searchquery', query);
		SearchPageElement.className = "searchresults"
		wrapper.appendChild(SearchPageElement);
	}
})
