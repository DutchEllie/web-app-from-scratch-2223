import { getSearchResults } from '../api.js';
import '../routie.min.js';

export class SearchPage extends HTMLElement {
	constructor() {
		super()

		this.searchResultsTitle = document.createElement('h1');
		this.searchResultsTitle.textContent = 'Search Results'

		this.closer = document.createElement('span');
		this.closer.className = 'closebutton';
		this.closer.addEventListener('click', event => {
			routie('/');
		})

		// Set searchQuery if it is set. Default is none.
		this.searchQuery = this.hasAttribute('data-searchquery') 
			? this.getAttribute('data-searchquery')
			: '';
	}

	static get observedAttributes(){
		return ['data-searchquery'];
	}

	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === 'data-searchquery') {
			this.searchQuery = newVal;

			// Just like on artpage, calling render here makes it reactive
			// not that we use it, but why not add it anyway?
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		this.innerHTML = "";

		// Did you know that you can't edit the DOM in the constructor?
		this.appendChild(this.searchResultsTitle)
		this.appendChild(this.closer);
		try {
			const res = await getSearchResults(this.searchQuery);
			res.artObjects.forEach(piece => {
				const artPieceResult = document.createElement('quickart-element')
				artPieceResult.data = piece;
				artPieceResult.id = piece.objectNumber;
				artPieceResult.setAttribute('src', piece.webImage.url);
				artPieceResult.returnPath = window.location.hash;
				this.appendChild(artPieceResult);
			})
		} catch(e) {
			console.error(e);
			for (let i = 0; i < 20; i++) {
				const artPieceResult = document.createElement('quickart-element')
				artPieceResult.id = 'error';
				artPieceResult.setAttribute('src', '/static/error.jpg');
				artPieceResult.returnPath = window.location.hash;
				this.appendChild(artPieceResult);
			}
		}

		
	}
}