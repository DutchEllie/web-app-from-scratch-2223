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
		this.innerHTML = "";
		this.render();
		this.appendChild(this.imageComponent);
		this.appendChild(this.titleComponent);
	}

	// This is just how the documentation says it works
	// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
	static get observedAttributes(){
		return ['id', 'src'];
	}

	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === 'id') {
			this.objectID = newVal;
		} else if (prop === 'src') {
			this.imageComponent.src = newVal;
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
