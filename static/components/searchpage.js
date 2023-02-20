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

	async update() {
		return getSearchResults(this.searchQuery);

	}

	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === 'data-searchquery') {
			this.searchQuery = newVal;
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		this.innerHTML = "";

		this.appendChild(this.searchResultsTitle)
		this.appendChild(this.closer);
		const res = await getSearchResults(this.searchQuery);
		res.artObjects.forEach(piece => {
			const artPieceResult = document.createElement('quickart-element')
			artPieceResult.data = piece;
			artPieceResult.id = piece.objectNumber;
			artPieceResult.setAttribute('src', piece.webImage.url);
			artPieceResult.returnPath = window.location.hash;
			// artPieceResult.id = piece.artObject.objectNumber;
			this.appendChild(artPieceResult);
		})

		
	}
}