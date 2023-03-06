import { getSearchResults } from '../api.js';
import '../routie.min.js';

export class SearchPage extends HTMLElement {
	constructor() {
		super()

		this.searchResultsTitle = document.createElement('h1');
		this.searchResultsTitle.textContent = 'Search Results'
		this.searchPageNumber = 0;
		this.scrollLock = false;

		this.closer = document.createElement('span');
		this.closer.className = 'closebutton';
		this.closer.addEventListener('click', event => {
			routie('/');
		})

		window.addEventListener('scroll', () => {
			if(this.scrollLock){
				return;
			}
			if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
				this.searchPageNumber += 1;
				this.scrollLock = true;
				this.update();
			}
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

	async update() {
		try {
			const res = await getSearchResults(this.searchQuery, this.searchPageNumber);
			res.artObjects.forEach(piece => {
				try {
					const artPieceResult = document.createElement('quickart-element')
					artPieceResult.data = piece;
					artPieceResult.id = piece.objectNumber;
					artPieceResult.setAttribute('src', piece.webImage.url ?? '');
					artPieceResult.returnPath = window.location.hash;
					this.appendChild(artPieceResult);
				} catch (e) {
					return
				}
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

		this.scrollLock = false;
	}

	async render() {
		this.innerHTML = "";

		this.update();

		// Did you know that you can't edit the DOM in the constructor?
		this.appendChild(this.searchResultsTitle)
		this.appendChild(this.closer);
	}
}