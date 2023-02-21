import { getObjectFull } from "../api.js";
import '../routie.min.js';

export class QuickArtObject extends HTMLElement {
	constructor() {
		super();
		this.#data = {};
		this.addEventListener('click', this.handleClick);
		this.imageComponent = document.createElement('img');
		this.titleComponent = document.createElement('p');
	}

	// Public fields
	#data;
	set data(x) {
		this.#data = x;
		this.render();
	}
	get data() {
		return this.#data;
	}
	#returnPath = '/';
	set returnPath(x) {
		this.#returnPath = x;
	}
	get returnPath() {
		return this.#returnPath;
	}

	connectedCallback() {
		this.render();
		this.innerHTML = "";
		this.appendChild(this.imageComponent);
		this.appendChild(this.titleComponent);
		// this.shadow.appendChild(this.styleComponent);
	}

	static get observedAttributes(){
		return ['id', 'src'];
	}

	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === 'id') {
			this.objectID = newVal;
			// this.render();
		} else if (prop === 'src') {
			this.imageComponent.src = newVal;
			// this.render();
		}
	}

	handleClick(event) {
		event.preventDefault();
		window.localStorage.setItem('returnpath', this.#returnPath);
		window.localStorage.setItem('artobject', JSON.stringify(this.#data));
		routie(`art/${this.objectID}`);
	}

	async render() {
		this.className = 'artpiece'

		if (this.data != {}) {
			this.imageComponent.alt = this.data.title;
			this.titleComponent.textContent = this.data.title;
		} else if (this.objectID) {
			const fullObject = await getObjectFull(this.objectID);
			this.imageComponent.src = fullObject.artObject.webImage.url;
			this.imageComponent.alt = fullObject.artObject.title;
			this.titleComponent.textContent = fullObject.artObject.title;
		}
	}
}

customElements.define('quickart-element', QuickArtObject);